import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
// import Posts from "./Posts";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Badge } from "./ui/badge";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);

  const [liked, setLiked] = useState(post?.likes?.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post?.likes?.length || 0);
  // const [comment, setComment] = useState(post?.comments || []);
  const [comments, setComment] = useState(post?.comments || []);
  const disPatch = useDispatch();

  // console.log("Post prop:", post); // Debug log

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post._id}/${action}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        const updatedData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );

        disPatch(setPosts(updatedData));

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const newComment = res.data.comment; // backend returns the comment object

        // const updatedCommentData = [...comment, res.data.message];
        const updatedCommentData = [...comments, newComment];
        setComment(updatedCommentData);
        setText("");

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );
        disPatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      // console.log(error);

      console.error("error in commentHandler", error);
      toast.error(error.response?.data?.message || "failed to add comment");
    }
  };

   const BookmarkHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/post/${post?._id}/bookmark`,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePostHandler = async () => {
    if (!post || !post._id) {
      toast.error("Invalid post ID");
      return;
    }
    if (!post.author || !post.author._id) {
      toast.error("Invalid post author");
      return;
    }
    try {
      // console.log("Logged-in user ID:", user?._id);
      // console.log("Post ID:", post._id);
      // console.log("Post author ID:", post.author._id);
      const res = await axios.delete(
        `http://localhost:8000/api/v1/post/delete/${post?._id}`,
        {
          data: { authorId: user._id },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id !== post?._id
        );
        disPatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Delete post error:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to delete post");
    }
  };

 

  const changeEventHandeler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  if (!post) {
    return null; // or a fallback UI
  }

  return (
    <div className="pl-10">
      <div className="flex justify-between">
        <div className="flex">
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="PostImage" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex gap-3">
            <h1>{post.author?.username || "Unknown"}</h1>
            {user?._id === post.author?._id && (
              <Badge variant="secondary">Author</Badge>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex justify-center flex-col items-center">

         
           
            {user && post.author && user._id === post.author._id && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956]"
              >
                delete
              </Button>
            )}

            {
              post?.author?._id !== user?._id &&  (<Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956]"
            >
              Unfollow
            </Button> )
            }
            {
               post?.author?._id !== user?._id  &&  <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956]"
            >
              follow
            </Button>
            }
           
          </DialogContent>
        </Dialog>
      </div>

      <img
        className="rounded-sm my-2 w-[32vw] h-[40vh] aspect-square "
        src={post.image}
        alt="PostImage"
      />

      <div className="flex justify-between">
        <div className="flex gap-5 hover:cursor-pointer">
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              size={"24"}
              className="cursor-pointer text-red-600"
            />
          ) : (
            <FaRegHeart onClick={likeOrDislikeHandler} size={24} />
          )}
          <FaRegHeart onClick={likeOrDislikeHandler} size={24} />
          <MessageCircle
            onClick={() => {
              disPatch(setSelectedPost(post));
              setOpen(true);
            }}
          />
          <Send size={20} />
        </div>
        <Bookmark
          onClick={BookmarkHandler}
          className="cursor-pointer hover:text-gray-600"
        />
      </div>

      <span>{postLike || 0} likes</span>
      <p>
        <span className="mr-2">{post.author?.username || "Unknown"}</span>
        {post.caption}
      </p>
      {comments.length > 0 && (
        <span
          onClick={() => {
            disPatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="cursor-pointer text-sm text-blue-400"
        >
          View all {comments ? comments.length : 0} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} comments={comments} />
      <div className="flex">
        <input
          type="text"
          placeholder="Add a Comment..."
          value={text}
          onChange={changeEventHandeler}
          className="outline-none text-sm w-full"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
