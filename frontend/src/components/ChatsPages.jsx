import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

import { setSelectedUser } from "@/redux/authSlice";
import MessagesHere from "./MessagesHere";
import axios from "axios";
import { setMessages } from "@/redux/chatSlice";
import useGetAllMessage from "@/hooks/userGetAllMessage";

const ChatsPages = () => {
  useGetAllMessage();
  const dispatch = useDispatch();
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);

  const sendMessageHandler = async (receiverId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${receiverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      ); //
      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <div className="flex ml-[18%] h-screen ">
      <section className="w-full md:w-1/4 my-8">
        <div className="flex ">
          <h1 className=" font-bold mb-4 px-3 text-xl ">{user?.username}</h1>
          <hr className="mb-4 border-gray-700 " />
          <div className="overflow-y-auto h-[80vh]">
            {suggestedUsers.map((suggestedUser) => {
              const isOnline = onlineUsers.includes(suggestedUser?._id);
              return (
                <div
                  key={suggestedUser?._id}
                  onClick={() => dispatch(setSelectedUser(suggestedUser))}
                  className="flex gap-3 items-center p-3  hover:cursor-pointer"
                >
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={suggestedUser?.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-5">
                    <span>{suggestedUser?.username}</span>
                    <span
                      className={`text-xs ${
                        isOnline ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      online
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedUser ? (
        <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full">
          <div className="flex gap-3 items-center sticky top-0 z-10 px-3 py-3 border-b border-gray-300 bg-white">
            <div className="flex gap-3 items-center px-3 py-2 border-b  border-gray-300 sticky top-0 bg-white z-10">
              <Avatar>
                <AvatarImage src={selectedUser?.profilePicture} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col ">
                <span>{selectedUser?.username}</span>
              </div>
            </div>
          </div>

          <MessagesHere selectedUser={selectedUser} />
          <div className="flex items-center p-4 border-t border-t-gray-300">
            <Input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              type="text"
              className="flex-1 focus-visible:ring-transparent"
              placeholder="Message..."
            />
            <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
              {" "}
              Send
            </Button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center max-auto ">
          <MessageCircle className="w-32 h-32 my-4" />
          <h1 className="font-bold text-xl">your messageds</h1>
          <span>Send a message to start chats</span>
        </div>
      )}
    </div>
  );
};

export default ChatsPages;






// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { MessageCircle } from "lucide-react";
// import { setSelectedUser } from "@/redux/authSlice";
// import MessagesHere from "./MessagesHere";
// import axios from "axios";
// import { setMessages } from "@/redux/chatSlice";
// import useGetAllMessage from "@/hooks/userGetAllMessage";

// const ChatsPages = () => {
//   useGetAllMessage();
//   const dispatch = useDispatch();
//   const [textMessage, setTextMessage] = useState("");
//   const { user, suggestedUsers, selectedUser } = useSelector((store) => store.auth);
//   const { onlineUsers, messages } = useSelector((store) => store.chat);

//   const sendMessageHandler = async (receiverId) => {
//     // Fix: Validate receiverId to prevent sending "undefined"
//     if (!receiverId || receiverId === "undefined" || !receiverId.match(/^[0-9a-fA-F]{24}$/)) {
//       console.error("No valid receiver selected");
//       return;
//     }
//     // Fix: Ensure textMessage is not empty
//     if (!textMessage.trim()) {
//       console.error("Message cannot be empty");
//       return;
//     }
//     try {
//       const res = await axios.post(
//         `http://localhost:8000/api/v1/message/send/${receiverId}`,
//         { textMessage },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         dispatch(setMessages([...messages, res.data.newMessage]));
//         setTextMessage("");
//       }
//     } catch (error) {
//       console.error("Send message error:", error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     return () => {
//       dispatch(setSelectedUser(null));
//     };
//   }, [dispatch]);

//   return (
//     <div className="flex ml-[18%] h-screen">
//       <section className="w-full md:w-1/4 my-8">
//         <div className="flex">
//           <h1 className="font-bold mb-4 px-3 text-xl">{user?.username}</h1>
//           <hr className="mb-4 border-gray-700" />
//           <div className="overflow-y-auto h-[80vh]">
//             {suggestedUsers.map((suggestedUser) => {
//               const isOnline = onlineUsers.includes(suggestedUser?._id);
//               return (
//                 <div
//                   key={suggestedUser?._id}
//                   // Fix: Validate suggestedUser._id before dispatching
//                   onClick={() => {
//                     if (suggestedUser?._id && suggestedUser._id.match(/^[0-9a-fA-F]{24}$/)) {
//                       dispatch(setSelectedUser(suggestedUser));
//                     } else {
//                       console.error("Invalid user ID:", suggestedUser);
//                     }
//                   }}
//                   className="flex gap-3 items-center p-3 hover:cursor-pointer"
//                 >
//                   <Avatar className="w-14 h-14">
//                     <AvatarImage src={suggestedUser?.profilePicture} />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>
//                   <div className="flex gap-5">
//                     <span>{suggestedUser?.username}</span>
//                     <span
//                       className={`text-xs ${isOnline ? "text-green-600" : "text-red-600"}`}
//                     >
//                       {isOnline ? "online" : "offline"}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {selectedUser ? (
//         <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full">
//           <div className="flex gap-3 items-center sticky top-0 z-10 px-3 py-3 border-b border-gray-300 bg-white">
//             <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10">
//               <Avatar>
//                 <AvatarImage src={selectedUser?.profilePicture} />
//                 <AvatarFallback>CN</AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col">
//                 <span>{selectedUser?.username}</span>
//               </div>
//             </div>
//           </div>

//           <MessagesHere selectedUser={selectedUser} />
//           <div className="flex items-center p-4 border-t border-t-gray-300">
//             <Input
//               value={textMessage}
//               onChange={(e) => setTextMessage(e.target.value)}
//               type="text"
//               className="flex-1 focus-visible:ring-transparent"
//               placeholder="Message..."
//             />
//             <Button onClick={() => sendMessageHandler(selectedUser?._id)}>
//               Send
//             </Button>
//           </div>
//         </section>
//       ) : (
//         <div className="flex flex-col items-center justify-center max-auto">
//           <MessageCircle className="w-32 h-32 my-4" />
//           <h1 className="font-bold text-xl">Your messages</h1>
//           <span>Send a message to start chats</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatsPages;