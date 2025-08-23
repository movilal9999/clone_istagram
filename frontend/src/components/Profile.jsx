// import React, { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import useGETUserProfileHere from "@/hooks/useGETUserProfileHere";
// import { Link, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Button } from "./ui/button";
// import { FaHeart } from "react-icons/fa6";
// import { MessageCircle } from "lucide-react";

// const Profile = () => {
//   const {userId} = useParams();





 
//   useGETUserProfileHere(userId);
//   const [activeTag, setActiveTag] = useState("posts");
//   const { userProfile, user } = useSelector((store) => store.auth);
//   console.log(userProfile);
//   const isLoggedInUser = user?._id === userProfile?._id;
//   const isFollowing = false;

//   const handleTabChange = (tab) => {
//     setActiveTag(tab);
//   };
//   const displayedPost =
//     activeTag === "posts" ? userProfile?.posts || [] : userProfile?.bookmarks || [];

// if (!userProfile) {
//     return <div className="text-center my-20">Loading...</div>;
//   }
//   if (!userProfile._id) {
//     return (
//       <div className="text-center my-20">
//         <h1 className="text-2xl font-bold text-red-600">User Not Found</h1>
//         <a href="/" className="text-blue-500 underline">Go back to Home</a>
//       </div>
//     );
//   }

//   return (
//     <div className="flex  max-w-4xl justify-center items-center mx-auto my-20">
//       <div className="">
//         <div className="flex gap-5">
//           <section className="grid grid-rows-2">
//             <Avatar className="h-32 w-32">
//               <AvatarImage
//                 src={userProfile?.profilePicture}
//                 alt="profilePicture"
//               />

//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//           </section>
//           <section className="">
//             {isLoggedInUser ? (
//               <>
//                 <span className="bg-gray-100 px-5 mr-5 py-2 rounded-lg">
//                   {userProfile?.username}
//                 </span>

//                 <Link to="/account/edit">
                
//                   <Button
//                     variant="secondary"
//                     className="hover:bg-white hover:text-black"
//                   >
//                     Edit Profile
//                   </Button>
//                 </Link>

//                 <Button
//                   variant="secondary"
//                   className="hover:bg-white hover:text-black mx-5"
//                 >
//                   Archieve
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   className="hover:bg-white hover:text-black "
//                 >
//                 only show
//                 </Button>
//               </>
//             ) : isFollowing ? (
//               <>
//                 <Button variant="secondary" className="">
//                   Unfollow
//                 </Button>
//                 <Button variant="secondary" className="">
//                   Message
//                 </Button>
//               </>
//             ) : (
//               <Button variant="secondary" className="bg-blue-500 ml-20">
//                 Follow
//               </Button>
//             )}

//             <div className="flex flex-rows-1 gap-10 my-10">
//               <p variant="secondary" className="">
//                 <span>{userProfile?.posts.length} </span> posts
//               </p>

//               <p variant="secondary" className="">
//                 <span> {userProfile?.followers.length}</span> followers
//               </p>
//               <p variant="secondary" className="">
//                 <span> {userProfile?.following.length} </span>following
//               </p>
//             </div>
//             <div className="flex flex-col gap-1">
//               <span> {userProfile?.bio || "bio here..."}</span>
//               <span>
//                 YA ILAHI baks de KHUDAYA ba Hakke Bani Fatima ki Bar kaule Ima
//                 kuni khatama Agar Da watan Rad kuni Bar kubool Mano Dast-e
//                 Damane Aale RASOOL 🤲🤲🤲
//               </span>
//               <span>YA ILAHI baks de 🤲🤲🤲</span>
//               <span>YA ILAHI baks de 🤲🤲🤲</span>
//             </div>
//           </section>
//         </div>
//         <div className=" border-t border-t-gray-300 my-20">
//           <div className="flex items-center justify-center gap-20 text-lg my-10">
//             <span
//               className={`py-3 cursor-pointer ${
//                 activeTag === "posts" ? "font-bold" : ""
//               } `}
//               onClick={() => handleTabChange("posts")}
//             >
//               POST
//             </span>

//             <span
//               className={`py-3 cursor-pointer ${
//                 activeTag === "saved" ? "font-bold" : ""
//               } `}
//               onClick={() => handleTabChange("saved")}
//             >
//               SAVE
//             </span>
//             <span className={`py-3 cursor-pointer`}>REELS</span>
//             <span className={`py-3 cursor-pointer`}>TAGS</span>
//           </div>
//           <div className="grid grid-cols-3 gap-1">
//             {displayedPost.map((post) => {
//               return (
//                 <div key={post?._id} className="relative group cursor-pointer">
//                   <img
//                     src={post.image}
//                     alt="postimage"
//                     className="rounded-sm my-2 w-full aspect-square object-cover"
//                   />
//                   <div className=" absolute inset-0 flex items-center   justify-center  bg-opacity-50 opacity opacity-0 group-hover:opacity-100 transition-opacity">
//                     <div className="flex items-center text-white space-x-4">
//                       <button className="flex items-center justify-center gap-2 hover:text-gray-300">
//                         <FaHeart className="text-red-500" />
//                         <span>{post.likes?.length || 0}</span>
//                       </button>

//                       <button className="flex items-center gap-2 hover:text-gray-300">
//                         <MessageCircle />
//                         <span>{post.comments?.length || 0}</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// ********************* have to analysis that above partion is not working properly and below partion is working properly this and also find out the error 


import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGETUserProfileHere from '@/hooks/useGETUserProfileHere';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { FaHeart } from 'react-icons/fa6';
import { MessageCircle } from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  useGETUserProfileHere(id); // Error: id = "edit" causes backend CastError
  const [activeTab, setActiveTab] = useState('posts');
  const { userProfile, user } = useSelector((store) => store.auth);
  const isLoggedInUser = user?._id === userProfile?._id;
  const isFollowing = userProfile?.followers?.includes(user?._id) || false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPosts = activeTab === 'posts' ? userProfile?.posts || [] : userProfile?.bookmarks || [];

  // Fixed: Added error handling for invalid userProfile (e.g., from id = "edit")
  if (!userProfile) {
    return <div className="text-center my-20">Loading...</div>;
  }
  if (!userProfile._id) {
    return (
      <div className="text-center my-20">
        <h1 className="text-2xl font-bold text-red-600">User Not Found</h1>
        <a href="/" className="text-blue-500 underline">Go back to Home</a>
      </div>
    );
  }

  return (
    <div className="flex max-w-4xl justify-center items-center mx-auto my-20">
      <div>
        <div className="flex gap-5">
          <section className="grid grid-rows-2">
            <Avatar className="h-32 w-32">
              <AvatarImage src={userProfile?.profilePicture} alt="Profile Picture" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            {isLoggedInUser ? (
              <>
                <span className="bg-gray-100 px-5 mr-5 py-2 rounded-lg">
                  {userProfile.username}
                </span>
                <Link to="/account/edit"> {/* Fixed: Ensured correct path */}
                  <Button variant="secondary" className="hover:bg-white hover:text-black">
                    Edit Profile
                  </Button>
                </Link>
                <Button variant="secondary" className="hover:bg-white hover:text-black mx-5">
                  Archive
                </Button>
              </>
            ) : isFollowing ? (
              <>
                <Button variant="secondary">Unfollow</Button>
                <Button variant="secondary">Message</Button>
              </>
            ) : (
              <Button variant="secondary" className="bg-blue-500 ml-20">
                Follow
              </Button>
            )}
            <div className="flex flex-row gap-10 my-10">
              <p>
                <span>{userProfile.posts?.length || 0} </span> posts
              </p>
              <p>
                <span>{userProfile.followers?.length || 0}</span> followers
              </p>
              <p>
                <span>{userProfile.following?.length || 0}</span> following
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span>{userProfile.bio || 'Bio here...'}</span>
            </div>
          </section>
        </div>
        <div className="border-t border-t-gray-300 my-20">
          <div className="flex items-center justify-center gap-20 text-lg my-10">
            <span
              className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'font-bold' : ''}`}
              onClick={() => handleTabChange('posts')}
            >
              POST
            </span>
            <span
              className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'font-bold' : ''}`}
              onClick={() => handleTabChange('saved')}
            >
              SAVE
            </span>
            <span className="py-3 cursor-pointer">REELS</span>
            <span className="py-3 cursor-pointer">TAGS</span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {displayedPosts.map((post) => (
              <div key={post?._id} className="relative group cursor-pointer">
                <img
                  src={post.image}
                  alt="Post Image"
                  className="rounded-sm my-2 w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity bg-black">
                  <div className="flex items-center text-white space-x-4">
                    <button className="flex items-center justify-center gap-2 hover:text-gray-300">
                      <FaHeart className="text-red-500" />
                      <span>{post?.likes?.length || 0}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-gray-300">
                      <MessageCircle />
                      <span>{post?.comments?.length || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
