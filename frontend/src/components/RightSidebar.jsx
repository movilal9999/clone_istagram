import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
// import store from "@/redux/store";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";

const RightSidebar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="w-fit my-20 pr-32 text-lg">
      <div className="flex items-center gap-5">
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="PostImage" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className="font-semibold  text-blue-600  hover:text-xl">
            <Link to={`/profile/${user?._id}`}> {user?.username}</Link>
          </h1>
          <span>{user?.bio || `bio come herer...`}</span>
       
        </div>
      </div>
      
         <SuggestedUsers />
    </div>
  );
};

export default RightSidebar;
