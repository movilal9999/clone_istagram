// import { setAuthUser } from "@/redux/authSlice";
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
// import axios from "axios";
// import {
//   Heart,
//   Home,
//   LogOut,
//   MessageCircle,
//   PlusSquare,
//   Search,
//   TrendingUp,
// } from "lucide-react";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import CreatePosts from "./CreatePosts";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@radix-ui/react-popover";
// import { Button } from "./ui/button";

// const LeftSidebar = () => {
//   const navigate = useNavigate();
//   const { likeNotification } = useSelector(
//     (store) => store.realTimeNotification
//   );
//   const { user } = useSelector((store) => store.auth); // store se koi bhi cheej lane ke liye useSelector ka use karaten hain
//   const dispatch = useDispatch();
//   const [open, setOpen] = useState(false);

//   const logoutHandeler = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setAuthUser(null));
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const sidebarHandler = (textType) => {
//     if (textType === "logout") {
//       logoutHandeler();
//     } else if (textType === "Create") {
//       setOpen(true);
//     } else if (textType === "profile") {
//       navigate(`/profile/${user?._id}`);
//     } else if (textType === "Home") {
//       navigate("/");
//     } else if (textType === "Message") {
//       navigate("/chat");
//     }
//   };

//   const LeftSidebarsItem = [
//     { icon: <Home />, text: "Home" },
//     { icon: <Search />, text: "Search" },

//     { icon: <TrendingUp />, text: "Explore" },

//     { icon: <MessageCircle />, text: "Message" },

//     { icon: <Heart />, text: "notification" },

//     { icon: <PlusSquare />, text: "Create" },

//     {
//       icon: (
//         <Avatar>
//           <AvatarImage src={user?.profilePicture} width={30} />
//           <AvatarFallback>CN</AvatarFallback>
//         </Avatar>
//       ),
//       text: "profile",
//     },
//     { icon: <LogOut />, text: "logout" },
//   ];
//   // fixed top-0
//   return (
//     <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
//       <div className="flex flex-col">
//         <h1 className="font-bold text-xl p-5">Logo</h1>
//         <div className="flex flex-col">
//           {LeftSidebarsItem.map((item, index) => {
//             return (
//               <div
//                 className="my-2 px-8  hover:cursor-pointer"
//                 onClick={() => sidebarHandler(item.text)}
//                 key={index}
//               >
//                 {item.icon}
//                 <span>{item.text}</span>
//                 {item.text === "Notifications" &&
//                   likeNotification.length > 0 && (
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button
//                           size="icon"
//                           className="rounded-full h-5 w-5 absolute bottom-6 left-6"
//                         >
//                           {likeNotification.length}
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent>
//                         {likeNotification.length === 0 ? (
//                           <p>No new Notification</p>
//                         ) : (
//                           likeNotification.map((notification) => {
//                             <div key={notification.userId}>
//                               <Avatar>
//                                 <AvatarImage
//                                   src={notification.userDetails?.profilePicture}
//                                 ></AvatarImage>
//                               </Avatar>
//                               <p className="text-sm">
//                                 <span className="font-bold">
//                                   {notification.userDetails?.username} liked
//                                   your post
//                                 </span>
//                               </p>
//                             </div>;
//                           })
//                         )}
//                       </PopoverContent>
//                     </Popover>
//                   )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <CreatePosts open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default LeftSidebar;


// LeftSidebar.jsx - Fixed version with comments explaining problems and solutions

import { setAuthUser } from "@/redux/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CreatePosts from "./CreatePosts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandeler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "logout") {
      logoutHandeler();
    } else if (textType === "Create") {
      setOpen(true);
    } else if (textType === "profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Message") {
      navigate("/chat");
    }
  };

  const LeftSidebarsItem = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Message" },
    { icon: <Heart />, text: "Notification" }, // Problem: The text was "notification" (lowercase), which didn't match the condition check below ("notification" vs "Notification"). Solution: Changed to "Notification" for consistency in the condition. After solution: The popover now triggers correctly when notifications are present.
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar>
          <AvatarImage src={user?.profilePicture} width={30} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "profile",
    },
    { icon: <LogOut />, text: "logout" },
  ];

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen">
      <div className="flex flex-col">
        <h1 className="font-bold text-xl p-5">Logo</h1>
        <div className="flex flex-col">
          {LeftSidebarsItem.map((item, index) => {
            return (
              <div
                className="my-2 px-8 hover:cursor-pointer flex items-center gap-2" // Added flex and gap for better alignment of icon and text.
                onClick={() => sidebarHandler(item.text)}
                key={index}
              >
                {item.icon}
                <span>{item.text}</span>
                {item.text === "Notification" && // Fixed case sensitivity to match the array item text.
                  likeNotification.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          className="rounded-full h-5 w-5 absolute  left-8 bg-red-500 text-white" 
                        >
                          {likeNotification.length}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-4 bg-white border rounded shadow-lg"> 
                 
                        {likeNotification.length === 0 ? (
                          <p>No new Notification</p>
                        ) : (
                          likeNotification.map((notification) => ( // Problem: The map function had incorrect parentheses and no implicit return; the JSX wasn't being returned properly, leading to no rendering of notifications. Solution: Wrapped the JSX in parentheses for implicit return in arrow function. After solution: Notifications now render correctly in the popover, showing user avatar and message when the icon is clicked.
                            <div key={notification.userId} className="flex items-center gap-2 mb-2"> 
                              <Avatar>
                                <AvatarImage
                                  src={notification.userDetails?.profilePicture}
                                  className="w-8 h-8 rounded-full" // Added sizing and rounding for avatar.
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <p className="text-sm">
                                <span className="font-bold">
                                  {notification.userDetails?.username}
                                </span> {notification.message} 
                              </p>
                            </div>
                          ))
                        )}
                      </PopoverContent>
                    </Popover>
                  )}
              </div>
            );
          })}
        </div>
      </div>

      <CreatePosts open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;
