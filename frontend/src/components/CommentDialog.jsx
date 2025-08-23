// import React, { useState } from "react";
// import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { MoreHorizontal } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "./ui/button";
// import { useSelector } from "react-redux";
// import Comment from "./Comment";
// import axios from "axios";

// const CommentDialog = ({ open, setOpen }) => {
//   const [text, setText] = useState("");
// const {selectedPost} = useSelector(store=>store.post);
// const [comments, setComment] = useState(selectedPost?.comment);

//   const changeEventHandler = (e) => {
//     const inputText = e.target.value;
//     if (inputText.trim()) {
//       setText(inputText);
//     } else {
//       setText("");
//     }
//   };

//    const sendMessageHandler  = async () => {
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/post/${selectedPost._id}/comment`,
//         { text },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         const newComment = res.data.comment; // backend returns the comment object

//         // const updatedCommentData = [...comment, res.data.message];
//         const updatedCommentData = [...comments, newComment];
//         setComment(updatedCommentData);
//         setText("");

//         const updatedPostData = posts.map((p) =>
//           p._id === post._id ? { ...p, comments: updatedCommentData } : p
//         );
//         disPatch(setPosts(updatedPostData));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       // console.log(error);

//       console.error("error in commentHandler", error);
//       toast.error(error.response?.data?.message || "failed to add comment");
//     }
//   };
//   return (
//     <div>
//       <Dialog open={open}>
//         <DialogContent className="p-0" onInteractOutside={() => setOpen(false)}>
//           <div className="flex gap-2 ">
//             <div className="w-1/2 overflow-hidden object-cover">
//               <img
//                 className=" w-full  rounded-l-sm object-cover overflow-hidden"
//                 src={selectedPost?.image}
//                 alt="PostImage"
//               />
//             </div>

//             <div>
//               <div className="flex gap-16">
//                 <div className="">
//                   <Link>
//                     <Avatar className="flex justify-center items-center">
//                       <AvatarImage src={selectedPost?.author?.username} />
//                       <AvatarFallback className=""> CN</AvatarFallback>
//                     </Avatar>
//                   </Link>
//                 </div>
//                 <div>
//                   <Link className="font-semibold text-xs">{selectedPost?.author?.profilePicture}</Link>
//                 </div>

//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <MoreHorizontal />
//                   </DialogTrigger>
//                   <DialogContent>
//                     <div className="flex justify-center flex-col items-center text-blue-500 cursor-pointer">
//                       <div>Unfollow</div>

//                       <div>Add to Favorites</div>
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               </div>

//               {/* All Comment here */}
//               <div className="flex-1 overflow-y-auto max-h-96 p-4">
//                 {
//                   selectedPost?.comments.map((comment)=><Comment key={comment._id} comment={comment}/>)
//                 }
//                 All comment come here
//               </div>

//               <div className="flex gap-2 my-8">
//                 <input
//                   type="text"
//                   value={text}
//                   onChange={changeEventHandler}
//                   placeholder="Add a Comment..."
//                   className="w-full ouline-none border border-gray-300"
//                 />
//                 <Button disabled={!text.trim()} onClick={sendMessageHandler} varient="outline">Send</Button>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default CommentDialog;

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { toast } from "sonner";
import { setPosts } from "@/redux/postSlice";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((store) => store.post);
  const [comments, setComment] = useState([]); // Initialize with empty array if undefined
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${selectedPost?._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const newComment = res.data.comment; // Backend returns the comment object
        const updatedCommentData = [...comments, newComment];
        setComment(updatedCommentData);
        setText("");

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id
            ? { ...p, comments: updatedCommentData }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error in commentHandler:", error);
      toast.error(error.response?.data?.message || "Failed to add comment");
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="p-0" onInteractOutside={() => setOpen(false)}>
          <div className="flex gap-2">
            <div className="w-1/2 overflow-hidden object-cover">
              <img
                className="w-full rounded-l-sm object-cover overflow-hidden"
                src={selectedPost?.image}
                alt="PostImage"
              />
            </div>

            <div>
              <div className="flex gap-16">
                <div>
                  <Link>
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage src={selectedPost?.author?.profilePicture} />{" "}
                      {/* Fixed: Use profilePicture instead of username */}
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
                <div>
                  <Link className="font-semibold text-xs">
                    {selectedPost?.author?.username}{" "}
                    {/* Fixed: Display username */}
                  </Link>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal />
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex justify-center flex-col items-center text-blue-500 cursor-pointer">
                      <div>Unfollow</div>
                      <div>Add to Favorites</div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* All Comments */}
              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                {comments.map(
                  (
                    comment // Fixed: Map directly over comments
                  ) => (
                    <Comment key={comment._id} comment={comment} />
                  )
                )}
              </div>

              <div className="flex gap-2 my-8">
                <input
                  type="text"
                  value={text}
                  onChange={changeEventHandler}
                  placeholder="Add a Comment..."
                  className="w-full outline-none border border-gray-300"
                />
                <Button
                  disabled={!text.trim()}
                  onClick={sendMessageHandler}
                  variant="outline" // Fixed: Corrected typo 'varient'
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentDialog;
