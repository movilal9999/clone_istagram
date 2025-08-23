// import {suggestedUsers } from "@/redux/authSlice";

// import React, { useEffect } from "react";
import {useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { fetchSuggestedUsers } from "@/redux/authSlice";


const SuggestedUsers = () => {
// const dispatch = useDispatch();
  const { suggestedUsers } = useSelector((store) => store.auth);

//   useEffect(() => {
//   dispatch(fetchSuggestedUsers());
// }, [dispatch]);
  return (
    <div>
      <div className="">
        <div className=" flex gap-10 my-10">
          <h1 className="font-semibold text-gray-600 ">Suggested for you</h1>
          <span className="font-semibold text-blue-500"> See all</span>
        </div>
      </div>

      {suggestedUsers && suggestedUsers.length > 0 ? (
  suggestedUsers.map((user) => {
   
        return (
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Link to={`/profile/${user?._id}`}>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="PostImage" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h1 className="font-semibold    hover:text-xl">
                  <Link to={`/profile/${user?._id}`}> {user?.username}</Link>
                </h1>
                <span>{user?.bio}</span>
              </div>
            </div>
            <div>
              <span className="text-[#3BADF8]  cursor-pointer hover:text-[#79c3f4] ">
                follow
              </span>
            </div>
          </div>
        );
      })
      ) : (
        <span>
          No SuggestedUsers
        </span>

      )
    }
    </div>
  );
};

export default SuggestedUsers;



// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { fetchSuggestedUsers } from "@/redux/authSlice";

// const SuggestedUsers = () => {
//   const dispatch = useDispatch();
//   const { suggestedUsers, loading, error } = useSelector((store) => store.auth);

//   useEffect(() => {
//     dispatch(fetchSuggestedUsers());
//   }, [dispatch]);

//   if (loading) {
//     return <span>Loading suggested users...</span>;
//   }

//   if (error) {
//     return <span>Error: {error}</span>;
//   }

//   return (
//     <div>
//       <div className="flex gap-10 my-10">
//         <h1 className="font-semibold text-gray-600">Suggested for you</h1>
//         <span className="font-semibold text-blue-500">See all</span>
//       </div>

//       {suggestedUsers && suggestedUsers.length > 0 ? (
//         suggestedUsers.map((user) => (
//           <div className="flex justify-between" key={user?._id}>
//             <div className="flex items-center gap-2">
//               <Link to={`/profile/${user?._id}`}>
//                 <Avatar>
//                   <AvatarImage src={user?.profilePicture} alt="PostImage" />
//                   <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//               </Link>
//               <div>
//                 <h1 className="font-semibold hover:text-xl">
//                   <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
//                 </h1>
//                 <span>{user?.bio}</span>
//               </div>
//             </div>
//             <div>
//               <span className="text-[#3BADF8] cursor-pointer hover:text-[#79c3f4]">
//                 follow
//               </span>
//             </div>
//           </div>
//         ))
//       ) : (
//         <span>No Suggested Users</span>
//       )}
//     </div>
//   );
// };

// export default SuggestedUsers;
