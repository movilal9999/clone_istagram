// import mongoose from "mongoose";
// import sharp from "sharp";
// import cloudinary from "../utils/cloudinary.js";
// import { Post } from "../models/post.model.js";
// import { User } from "../models/user.models.js";
// import { Comment } from "../models/comment.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";


// export const addNewPost = async (req, res) => {
//   try {
//     const { caption } = req.body;
//     const image = req.file;

//     if (!image) return res.status(400).json({ message: "Image required" });

//     // Image optimization
//     const optimizedImageBuffer = await sharp(image.buffer)
//       .resize({ width: 800, height: 800, fit: "inside" })
//       .toFormat("jpeg", { quality: 80 })
//       .toBuffer();

//     // Buffer to base64
//     const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
//       "base64"
//     )}`;

//     const cloudResponse = await cloudinary.uploader.upload(fileUri);

//     const authorId = req.id; // ✅ Correctly get the author's ID

//     const post = await Post.create({
//       caption,
//       image: cloudResponse.secure_url,
//       author: authorId,
//     });

//     const user = await User.findById(authorId); // ✅ typo fixed
//     if (user) {
//       user.posts.push(post._id);
//       await user.save();
//     }

//     await post.populate({ path: "author", select: "-password" });

//     return res.status(201).json({
//       message: "New post added",
//       post,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
 
           

//             export const getAllPost = async (req, res) => {
//               try {
//                 const posts = await Post.find()
//                   .sort({ createdAt: -1 })
//                   .populate({ path: "author", select: "username profilePicture" })
//                   .populate({
//                     path: "comments",
//                     sort: { createdAt: -1 },
//                     populate: {
//                       path: "author",
//                       select: "username profilePicture"
//                     }
//                   })
//                 console.log("Fetched posts with populated data:", JSON.stringify(posts, null, 2));
//                 return res.status(200).json({
//                   posts,
//                   success: true
//                 });
//               } catch (error) {
//                 console.log("Error in getAllPost:", error);
//                 return res.status(500).json({ success: false, message: "Server error" });
//               }
//             };



// export const getUserPost = async (req, res) => {
//   try {
//     const authorId = req.id;
//     const posts = await Post.find({ author: authorId })
//       .sort({ createdAt: -1 })
//       .populate({
//         path: "author",
//         select: "username",
//         profilePicture,
//       })
//       .populate({
//         path: "comments",
//         sort: { createdAt: -1 },
//         populate: {
//           path: "author",
//           select: "username profilePicture",
//         },
//       });
//     return res.status(200).json({
//       posts,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

                        

// export const likePost = async (req, res) => {
//   try {
//     const userId = req.id;
//     const postId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) {
//       return res.status(400).json({ message: "Invalid ID", success: false });
//     }

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found", success: false });
//     }

//     if (!post.likes) {
//       post.likes = [];
//     }

//     if (post.likes.includes(userId)) {
//       return res.status(400).json({ message: "Post already liked", success: false });
//     }

//     post.likes.push(userId);
//     await post.save();

//     // const user = await user.findById(userId).select('username profilePicture');
//     const user = await User.findById(userId).select('username profilePicture');
//     const postOwnerId = post.author.toString();
//     if(postOwnerId !== userId){
//       const notification = {
//         type: 'like',
//         userId: userId,
//         userDetails: user,
//         postId,
//         message: 'your post was liked'
//       }
      
//       const postOwnerSocketId = getReceiverSocketId(postOwnerId);
//       // io.to(postOwnerId).emit('notification', notification);
//       io.to(postOwnerSocketId).emit('notification', notification);
//     }

//     return res.status(200).json({
//       message: "Post liked successfully",
//       success: true,
//       likes: post.likes,
//       likeCount: post.likes.length,
//     });
//   } catch (error) {
//     console.error("Error in likePost:", error);
//     return res.status(500).json({ message: "Internal server error", success: false });
//   }
// };


                   
                          

//       export const dislikePost = async (req, res) => {
//   try {
//     const userId = req.id;
//     const postId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) {
//       return res.status(400).json({ message: "Invalid ID", success: false });
//     }

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found", success: false });
//     }

//     if (!post.likes) {
//       post.likes = [];
//     }

//     if (!post.likes.includes(userId)) {
//       return res.status(400).json({ message: "Post not liked", success: false });
//     }

//     post.likes = post.likes.filter((id) => id.toString() !== userId);
//     await post.save();

//       const user = await User.findById(userId).select('username profilePicture');
//     const postOwnerId = post.author.toString();
//     if(postOwnerId !== userId){
//       const notification = {
//         type: 'dislike',
//         userId: userId,
//         userDetails: user,
//         postId,
//         message: 'your post was disliked'
//       }
//       const postOwnerSocketId = getReceiverSocketId(postOwnerId);
//       // io.to(postOwnerId).emit('notification', notification);
//             io.to(postOwnerSocketId).emit('notification', notification);

//     }

//     return res.status(200).json({
//       message: "Post disliked successfully",
//       success: true,
//       likes: post.likes,
//       likeCount: post.likes.length,
//     });
//   } catch (error) {
//     console.error("Error in dislikePost:", error);
//     return res.status(500).json({ message: "Internal server error", success: false });
//   }
// };











// export const addComment = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const commentKaraneWaleUserKiId = req.id;

//     const { text } = req.body;
//     const post = await Post.findById(postId);

//     if (!text)
//       return res
//         .status(404)
//         .json({ message: "text is required", success: false });
//     const comment = await Comment.create({
//       text,
//       author: commentKaraneWaleUserKiId,
//       post: postId,
//     })
//     await comment.populate({
//       path: "author",
//       select: "username profilePicture",
//     });
//     post.comments.push(comment._id);
//     await post.save();

//     return res
//       .status(201)
//       .json({ message: "Comment Added", comment, success: true });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getCommentsOfPost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const comments = await Comment.find({ post: postId }).populate(
//       "author",
//       "username profilePicture"
//     );
//     if (!comments)
//     {

//       return res
//         .status(404)
//         .json({ message: "No comments for this post", success: false });
//     }
//     return res.status(200).json({
//       message:'Comment Successfully added', success: true, comments });
//   } catch (error) {
//     console.log(error);
//   }
// };

                


//                     export const deletePost = async (req, res) => {
//                         try {
//                           const postId = req.params.id;
//                           const { authorId } = req.body; // Extract authorId from body
                      
//                           const post = await Post.findById(postId);
//                           if (!post)
//                             return res
//                               .status(404)
//                               .json({ message: "Post not found", success: false });
                      
//                           // Check if logged-in user is the owner of the post
//                           if (post.author.toString() !== authorId)
//                             return res
//                               .status(403)
//                               .json({ message: "You can't delete this post", success: false });
                      
//                           await Post.findByIdAndDelete(postId);
                      
//                           // Remove the postId from the user's posts
//                           let user = await User.findById(authorId);
//                           user.posts = user.posts.filter((id) => id.toString() !== postId);
//                           await user.save();
                      
//                           // Delete associated comments
//                           await Comment.deleteMany({ post: postId });
//                           return res.status(200).json({
//                             success: true,
//                             message: "Post deleted",
//                           });
//                         } catch (error) {
//                           console.error(error);
//                           return res
//                             .status(500)
//                             .json({ message: "Server error", success: false });
//                         }
//                       };





  

// export const bookmarkPost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const authorId = req.id;
//     const post = await Post.findById(postId);
//     if (!post)
//       return res
//         .status(404)
//         .json({ message: "'Post not found", success: false });

//     const user = await User.findById(authorId);
//     if (user.bookmarks.includes(post._id)) {
//       //if already bookmarked then remove bookmarked
//       await user.updateOne({ $pull: { bookmarks: post._id } });
//       await user.save();
//       return res
//         .status(200)
//         .json({
//           type: "unsaved",
//           message: "Post removed from bookmarks",
//           success: true,
//         });
//     } else {
//       //now bookmark logic here
//       await user.updateOne({ $push: { bookmarks: post._id } });
//       await user.save();
//       return res
//         .status(200)
//         .json({ type: "saved", message: "Post  bookmarked", success: true });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };





// post.controller.js - Fixed version with comments explaining problems and solutions

import mongoose from "mongoose";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.models.js";
import { Comment } from "../models/comment.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const addNewPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;

    if (!image) return res.status(400).json({ message: "Image required", success: false });

    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;

    const cloudResponse = await cloudinary.uploader.upload(fileUri);

    const authorId = req.id;

    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });

    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });

    return res.status(201).json({
      message: "New post added",
      post,
      success: true,
    });
  } catch (error) {
    console.error("Error in addNewPost:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      });
    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.error("Error in getAllPost:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username profilePicture", // Problem: Syntax error in select (comma after "username" and profilePicture as separate argument). Solution: Combined into a single string "username profilePicture". After solution: Population now works correctly, fetching both fields without errors.
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      });
    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.error("Error in getUserPost:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const likePost = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid ID", success: false });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    if (!post.likes) {
      post.likes = [];
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: "Post already liked", success: false });
    }

    post.likes.push(userId);
    await post.save();

    const user = await User.findById(userId).select('username profilePicture');
    const postOwnerId = post.author.toString();
    if (postOwnerId !== userId) {
      const notification = {
        type: 'like',
        userId: userId,
        userDetails: user,
        postId,
        message: 'your post was liked'
      };
      
      const postOwnerSocketId = getReceiverSocketId(postOwnerId);
      io.to(postOwnerSocketId).emit('notification', notification); // Problem: Emitting to postOwnerId (user ID) instead of postOwnerSocketId (actual socket ID), causing notifications not to be sent to the correct socket. Solution: Changed to io.to(postOwnerSocketId).emit. After solution: Notifications are now emitted to the correct socket ID, allowing real-time delivery to the post owner.
    }

    return res.status(200).json({
      message: "Post liked successfully",
      success: true,
      likes: post.likes,
      likeCount: post.likes.length,
    });
  } catch (error) {
    console.error("Error in likePost:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid ID", success: false });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    if (!post.likes) {
      post.likes = [];
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).json({ message: "Post not liked", success: false });
    }

    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();

    const user = await User.findById(userId).select('username profilePicture');
    const postOwnerId = post.author.toString();
    if (postOwnerId !== userId) {
      const notification = {
        type: 'dislike',
        userId: userId,
        userDetails: user,
        postId,
        message: 'your post was disliked'
      };
      const postOwnerSocketId = getReceiverSocketId(postOwnerId);
      io.to(postOwnerSocketId).emit('notification', notification); // Problem: Same as in likePost - emitting to user ID instead of socket ID. Solution: Changed to postOwnerSocketId. After solution: Dislike notifications are now correctly sent in real-time.
    }

    return res.status(200).json({
      message: "Post disliked successfully",
      success: true,
      likes: post.likes,
      likeCount: post.likes.length,
    });
  } catch (error) {
    console.error("Error in dislikePost:", error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id; // Changed variable name for consistency (from commentKaraneWaleUserKiId).
    const { text } = req.body;

    if (!text) return res.status(400).json({ message: "text is required", success: false }); // Fixed status code to 400 (bad request) instead of 404.

    const post = await Post.findById(postId);

    const comment = await Comment.create({
      text,
      author: userId,
      post: postId,
    });

    await comment.populate({
      path: "author",
      select: "username profilePicture",
    });
    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({ message: "Comment Added", comment, success: true });
  } catch (error) {
    console.error("Error in addComment:", error); // Added proper error logging and response.
    return res.status(500).json({ message: "Server error", success: false }); // Problem: No return in catch block, could cause hanging requests. Solution: Added return with error response. After solution: Errors are now properly handled and responded to the client.
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username profilePicture"
    );
    if (!comments || comments.length === 0) { // Added length check for empty array.
      return res.status(404).json({ message: "No comments for this post", success: false });
    }
    return res.status(200).json({
      message: 'Comment Successfully added', success: true, comments });
  } catch (error) {
    console.error("Error in getCommentsOfPost:", error);
    return res.status(500).json({ message: "Server error", success: false }); // Problem: No return in catch. Solution: Added return. After solution: Proper error handling.
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id; // Changed to use req.id for consistency (instead of req.body.authorId).

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: "Post not found", success: false });

    if (post.author.toString() !== authorId)
      return res.status(403).json({ message: "You can't delete this post", success: false });

    await Post.findByIdAndDelete(postId);

    let user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    await Comment.deleteMany({ post: postId });
    return res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: "Post not found", success: false }); // Fixed typo in message.

    const user = await User.findById(authorId);
    if (user.bookmarks.includes(post._id)) {
      await user.updateOne({ $pull: { bookmarks: post._id } });
      return res.status(200).json({
        type: "unsaved",
        message: "Post removed from bookmarks",
        success: true,
      });
    } else {
      await user.updateOne({ $push: { bookmarks: post._id } });
      return res.status(200).json({ type: "saved", message: "Post bookmarked successfully", success: true }); // Fixed typo in message.
    }
  } catch (error) {
    console.error("Error in bookmarkPost:", error);
    return res.status(500).json({ message: "Server error", success: false }); // Problem: No return in catch. Solution: Added return. After solution: Proper error handling.
  }
};



// import mongoose from "mongoose";
// import sharp from "sharp";
// import cloudinary from "../utils/cloudinary.js";
// import { Post } from "../models/post.model.js";
// import { User } from "../models/user.models.js";
// import { Comment } from "../models/comment.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const addNewPost = async (req, res) => {
//   try {
//     const { caption } = req.body;
//     const image = req.file;

//     if (!image) return res.status(400).json({ message: "Image required" });

//     // Image optimization
//     const optimizedImageBuffer = await sharp(image.buffer)
//       .resize({ width: 800, height: 800, fit: "inside" })
//       .toFormat("jpeg", { quality: 80 })
//       .toBuffer();

//     // Buffer to base64
//     const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString("base64")}`;

//     const cloudResponse = await cloudinary.uploader.upload(fileUri);

//     const authorId = req.id;

//     const post = await Post.create({
//       caption,
//       image: cloudResponse.secure_url,
//       author: authorId,
//     });

//     const user = await User.findById(authorId);
//     if (user) {
//       user.posts.push(post._id);
//       await user.save();
//     }

//     await post.populate({ path: "author", select: "-password" });

//     return res.status(201).json({
//       message: "New post added",
//       post,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in addNewPost:", error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

// export const getAllPost = async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .sort({ createdAt: -1 })
//       .populate({ path: "author", select: "username profilePicture" })
//       .populate({
//         path: "comments",
//         sort: { createdAt: -1 },
//         populate: {
//           path: "author",
//           select: "username profilePicture",
//         },
//       });
//     return res.status(200).json({
//       posts,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in getAllPost:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// export const getUserPost = async (req, res) => {
//   try {
//     const authorId = req.id;
//     const posts = await Post.find({ author: authorId })
//       .sort({ createdAt: -1 })
//       .populate({
//         path: "author",
//         select: "username profilePicture", // Fixed: profilePicture was incorrectly formatted
//       })
//       .populate({
//         path: "comments",
//         sort: { createdAt: -1 },
//         populate: {
//           path: "author",
//           select: "username profilePicture",
//         },
//       });
//     return res.status(200).json({
//       posts,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in getUserPost:", error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

// export const likePost = async (req, res) => {
//   try {
//     const userId = req.id;
//     const postId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) {
//       return res.status(400).json({ message: "Invalid ID", success: false });
//     }

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found", success: false });
//     }

//     if (!post.likes) {
//       post.likes = [];
//     }

//     if (post.likes.includes(userId)) {
//       return res.status(400).json({ message: "Post already liked", success: false });
//     }

//     post.likes.push(userId);
//     await post.save();

//     // Notification logic
//     const postOwnerId = post.author.toString();
//     if (postOwnerId !== userId) {
//       const user = await User.findById(userId).select("username profilePicture");
//       if (user) {
//         const notification = {
//           type: "like",
//           userId: userId,
//           userDetails: user,
//           postId,
//           message: "Your post was liked",
//         };
//         const postOwnerSocketId = getReceiverSocketId(postOwnerId);
//         if (postOwnerSocketId) {
//           io.to(postOwnerSocketId).emit("notification", notification);
//         }
//       }
//     }

//     return res.status(200).json({
//       message: "Post liked successfully",
//       success: true,
//       likes: post.likes,
//       likeCount: post.likes.length,
//     });
//   } catch (error) {
//     console.error("Error in likePost:", error);
//     return res.status(500).json({ message: "Internal server error", success: false });
//   }
// };

// export const dislikePost = async (req, res) => {
//   try {
//     const userId = req.id;
//     const postId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) {
//       return res.status(400).json({ message: "Invalid ID", success: false });
//     }

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found", success: false });
//     }

//     if (!post.likes) {
//       post.likes = [];
//     }

//     if (!post.likes.includes(userId)) {
//       return res.status(400).json({ message: "Post not liked", success: false });
//     }

//     post.likes = post.likes.filter((id) => id.toString() !== userId);
//     await post.save();

//     // Notification logic
//     const postOwnerId = post.author.toString();
//     if (postOwnerId !== userId) {
//       const user = await User.findById(userId).select("username profilePicture");
//       if (user) {
//         const notification = {
//           type: "dislike",
//           userId: userId,
//           userDetails: user,
//           postId,
//           message: "Your post was disliked",
//         };
//         const postOwnerSocketId = getReceiverSocketId(postOwnerId);
//         if (postOwnerSocketId) {
//           io.to(postOwnerSocketId).emit("notification", notification);
//         }
//       }
//     }

//     return res.status(200).json({
//       message: "Post disliked successfully",
//       success: true,
//       likes: post.likes,
//       likeCount: post.likes.length,
//     });
//   } catch (error) {
//     console.error("Error in dislikePost:", error);
//     return res.status(500).json({ message: "Internal server error", success: false });
//   }
// };

// export const addComment = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const userId = req.id;
//     const { text } = req.body;

//     if (!text) {
//       return res.status(400).json({ message: "Text is required", success: false });
//     }

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found", success: false });
//     }

//     const comment = await Comment.create({
//       text,
//       author: userId,
//       post: postId,
//     });

//     await comment.populate({
//       path: "author",
//       select: "username profilePicture",
//     });

//     post.comments.push(comment._id);
//     await post.save();

//     return res.status(201).json({
//       message: "Comment added",
//       comment,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in addComment:", error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

// export const getCommentsOfPost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const comments = await Comment.find({ post: postId }).populate(
//       "author",
//       "username profilePicture"
//     );

//     if (!comments || comments.length === 0) {
//       return res.status(404).json({ message: "No comments for this post", success: false });
//     }

//     return res.status(200).json({
//       message: "Comments retrieved successfully",
//       success: true,
//       comments,
//     });
//   } catch (error) {
//     console.error("Error in getCommentsOfPost:", error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

// export const deletePost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const authorId = req.id; // Use req.id instead of req.body.authorId for consistency

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found", success: false });
//     }

//     if (post.author.toString() !== authorId) {
//       return res.status(403).json({ message: "You can't delete this post", success: false });
//     }

//     await Post.findByIdAndDelete(postId);

//     let user = await User.findById(authorId);
//     user.posts = user.posts.filter((id) => id.toString() !== postId);
//     await user.save();

//     await Comment.deleteMany({ post: postId });

//     return res.status(200).json({
//       success: true,
//       message: "Post deleted",
//     });
//   } catch (error) {
//     console.error("Error in deletePost:", error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

// export const bookmarkPost = async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const authorId = req.id;

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found", success: false });
//     }

//     const user = await User.findById(authorId);
//     if (user.bookmarks.includes(post._id)) {
//       await user.updateOne({ $pull: { bookmarks: post._id } });
//       return res.status(200).json({
//         type: "unsaved",
//         message: "Post removed from bookmarks",
//         success: true,
//       });
//     } else {
//       await user.updateOne({ $push: { bookmarks: post._id } });
//       return res.status(200).json({
//         type: "saved",
//         message: "Post bookmarked",
//         success: true,
//       });
//     }
//   } catch (error) {
//     console.error("Error in bookmarkPost:", error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };




// import posts from './Posts.js';

// export const addNewPost = async (req, res) => {
//   try {
//     const { caption } = req.body;
//     const image = req.file;
//     if (!image) return res.status(400).json({ message: "Image required" });

//     //image upload
//     const optimizedImageBuffer = await sharp(image.buffer)
//       .resize({ width: 800, height: 800, fit: "inside" })
//       .toFormat("jpeg", { quality: 80 })
//       .toBuffer();
//     // Buffer to data Uri
//     const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
//       "base64"
//     )}`;
//     const cloudResponse = await cloudinary.uploader.upload(fileUri);

    
//                                const authorId = req.id; // this is update from chatgpt
//     const post = await Post.create({
//       caption,
//       image: cloudResponse.secure_url,
//       author: authorId,
//     });

//     const user = await User.findById(autherId);  // here spelling of author is wrong imrove below
//     if (user) {
//       user.posts.push(post._id);
//       await user.save();
//     }
//     await post.populate({ path: "author", select: "-password" });
//     return res.status(201).json({
//       message: "New post added",
//       post,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };


  // export const likePost = async (req, res) => {
                          //   try {
                          //     const likeKaraneWaleUserKiId = req.id;
                          //     const postId = req.params.id;
                          //     const post = await Post.findById(postId);
                          //     if (!post) return res.status(404).json({ likes: likeKaraneWaleUserKiId });
                          //     await post.save();

                          //     //implement  sockets io for real time notification

                          //     return res.status(200).json({ message: "Post liked", success: true });
                          //   } catch (error) {
                          //     console.log(error);
                          //   }
                          // };

                         

// import { Post } from "../models/post.model.js";


       // export const dislikePost = async (req, res) => {
                          //   try {
                          //     const disLikeKaraneWaleUserKiId = req.id;
                          //     const postId = req.params.id;
                          //     const post = await Post.findById(postId);
                          //     if (!post)
                          //       return res
                          //         .status(404)
                          //         .json({ message: "Post not found", success: false });

                          //     //disLike logic strted
                          //     await post.updateOne({ $pull: { likes: disLikeKaraneWaleUserKiId } });
                          //     await post.save();

                          //     //implement socket io for real time notification
                          //     return res.status(200).json({ message: "Post disliked", success: true });
                          //   } catch (error) {
                          //     console.log();
                          //   }
                          // };


                          
//                           import mongoose from "mongoose";
// // import Post from "../models/post.model.js";

// export const likePost = async (req, res) => {
//   try {
//     const userId = req.id;
//     const postId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) {
//       return res.status(400).json({ message: "Invalid ID", success: false });
//     }

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found", success: false });
//     }

//     if (!post.likes) {
//       post.likes = [];
//     }

//     if (post.likes.includes(userId)) {
//       return res.status(400).json({ message: "Post already liked", success: false });
//     }

//     post.likes.push(userId);
//     await post.save();

//     return res.status(200).json({
//       message: "Post liked successfully",
//       success: true,
//       likes: post.likes,
//       likeCount: post.likes.length,
//     });
//   } catch (error) {
//     console.error("Error in likePost:", error);
//     return res.status(500).json({ message: "Internal server error", success: false });
//   }
// };

// export const dislikePost = async (req, res) => {
//   try {
//     const userId = req.id;
//     const postId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(postId)) {
//       return res.status(400).json({ message: "Invalid ID", success: false });
//     }

//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found", success: false });
//     }

//     if (!post.likes) {
//       post.likes = [];
//     }

//     if (!post.likes.includes(userId)) {
//       return res.status(400).json({ message: "Post not liked", success: false });
//     }

//     post.likes = post.likes.filter((id) => id.toString() !== userId);
//     await post.save();

//     return res.status(200).json({
//       message: "Post disliked successfully",
//       success: true,
//       likes: post.likes,
//       likeCount: post.likes.length,
//     });
//   } catch (error) {
//     console.error("Error in dislikePost:", error);
//     return res.status(500).json({ message: "Internal server error", success: false });
//   }
// };


