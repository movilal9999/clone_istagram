import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";


export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(401).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Please Try Different email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect User or Email",
        success: false,
      });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    //populate each post if in the posts array
    const populatedPosts = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post.author.equals(user._id)) {
          return post;
        }
        return null;
      })
    );
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio || "",
      followers: user.followers,
      following: user.following,
      posts: populatedPosts,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `welcome back ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (_, res) => {
  try {
    return res.status(200).json({
      // return res.status("token", "", { maxAge: 0 }).json({
      mesage: "logged Out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId)
      .populate({ path: "posts", createdAt: -1 })
      .populate("bookmarks"); // use select("-password") not show password during access profile
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (req, res) => {
  // recheck if found any problem
  try {
    // const // before it make the middleware that is handled work b/w req and res
    const userId = req.id; // Before move forword setUp cloudinary
    // setUp cloudinary, setUp also datauri this file is created inside utils.js

    const { bio, gender } = req.body;
    const profilePicture = req.file;
    let cloudResponse;

    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
      // cloudResponse = await cloudinary.uploader.upload(fileUri.content);//
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
      });
    }
    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;

    await user.save();

    const updatedUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio || "", // Ensure bio is included
      gender: user.gender || "",
      followers: user.followers,
      following: user.following,
    };

    return res.status(200).json({
      message: "ProfileUpdated",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log("Edit Profile error", error);
    return res.status(500).json({
      message: error.message || "Server error",
      success: false,
    });
  }
};

export const suggestedUser = async (req, res) => {
  try {
    const suggestedUser = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!suggestedUser) {
      return res.status(401).json({
        message: "Currently do not any Account",
      });
    }
    return res.status(200).json({
      success: true,
      users: suggestedUser,
    });
  } catch (error) {
    console.log(error);
  }
};

// follow and unfollow
export const followOrUnfollow = async (req, res) => {
  try {
    const followKaraneWala = req.id; // loggedIn user or Mian
    const jisakoFollowKarunga = req.params.id; // target users not loggedin user
    if (followKaraneWala === jisakoFollowKarunga) {
      return res.status(400).json({
        message: "you can not follow/Unfollow yourself",
        success: false,
      });
    }
    const user = await User.findById(followKaraneWala);
    const targetUser = await User.findById(jisakoFollowKarunga);

    if (!user || !targetUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const isFollowing = user.following.includes(jisakoFollowKarunga);
    if (isFollowing) {
      // UnFollow logic aayega
      // when handles two documents along with then user promise
      await Promise.all([
        User.updateOne(
          { _id: followKaraneWala },
          { $pull: { following: jisakoFollowKarunga } }
        ),
        User.updateOne(
          { _id: jisakoFollowKarunga },
          { $pull: { followers: followKaraneWala } }
        ),
      ]);
      return res
        .status(200)
        .json({ message: "Unfollowed Sucessfully", success: true });
    } else {
      // follow logic aayega
      await Promise.all([
        User.updateOne(
          { _id: followKaraneWala },
          { $push: { following: jisakoFollowKarunga } }
        ),
        User.updateOne(
          { _id: jisakoFollowKarunga },
          { $push: { followers: followKaraneWala } }
        ),
      ]);
      return res.status(200).json({
        message: "followed Sucessfully",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
