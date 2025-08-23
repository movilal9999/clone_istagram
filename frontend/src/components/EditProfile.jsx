// import React, { useRef, useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "./ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import axios from "axios";
// import { Loader2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { setAuthUser } from "@/redux/authSlice";
// // import { updateProfile } from '@/redux/authSlice'; // Fixed: Added assumed action

// const EditProfile = () => {
//   const { user } = useSelector((store) => store.auth);
//   const imageRef = useRef();
//   const [loading, setLoading] = useState(false);

//   const [input, setInput] = useState({
//     profilePhoto: user?.profilePicture || '',
//     bio: user?.bio || '',
//     gender: user?.gender,
//   });
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const fileChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setInput({ ...input, profilePhoto: file });
//   };
//   const selectChangeHandler = (value) => {
//     setInput({ ...input, gender: value });
//   };

//   const editProfileHandler = async () => {
//     const formData = new FormData();
//     formData.append("bio", input.bio || '');
//     formData.append("gender", input.gender || '');
//     if (input.profilePhoto && input.profilePhoto instanceof File) {
//       formData.append("profilePicture", input.profilePhoto);
//     }
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         'http://localhost:8000/api/v1/user/profile/edit',
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             // Authorization: `Bearer ${localStorage.getItem('token')}`
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         const updateUserData = {
//           ...user,
//           bio: res.data.user?.bio,
//           profilePicture: res.data.user?.profilePicture,
//           gender: res.data.user.gender,
//         };
//         dispatch(setAuthUser(updateUserData));
//         navigate(`/profile/${user?._id}`);
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex  max-w-2xl mx-auto pl-10">
//       <section className="flex flex-col  w-full  gap-6">
//         <h1 className="font-bold"> Edit Profile</h1>

//         <div className="flex items-center justify-between bg-gray-200 rounded-xl p-4">
//           <div className="flex gap-3 ">
//             <Avatar>
//               <AvatarImage src={user?.profilePicture} alt="postImgage" />{" "}
//               <AvatarFallback>CN</AvatarFallback>
//             </Avatar>
//             <div>
//               <h1>{user?.username}</h1>
//               <span>{user?.bio || "bio here"}</span>
              
//             </div>
//           </div>{" "}
//           <input
//             ref={imageRef}
//             onChange={fileChangeHandler}
//             type="file"
//             className="hidden"
//           />
//           <Button
//             onClick={() => imageRef?.current.click()}
//             className="bg-[#0095F6]"
//           >
//             choose photo
//           </Button>
//         </div>
//         <div>
//           <h1 className="font-bold text-2xl mb-2">Bio</h1>
//           <textarea
//             value={input.bio}
//             onChange={(e) => setInput({ ...input, bio: e.target.value })}
//             name="bio"
//             cols={80}
//             rows={3}
//             placeholder="Write bio here"
//             className="focus-visible:ring-transparent p-2 "
//           />
//         </div>
//         <div>
//           <h1>Gender</h1>
//           <Select
//             defaultValue={input.gender}
//             onValueChange={selectChangeHandler}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="male">Male</SelectItem>
//               <SelectItem value="female">Female</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="flex justify-end">
//           {loading ? (
//             <Button className="bg-blue-600 hover:bg-blue-100">
//               <Loader2 className="mr-2 h-2 w-4 animate-spin" />
//               please wait...
//             </Button>
//           ) : (
//             <Button
//               onClick={editProfileHandler}
//               className="bg-blue-600 hover:bg-blue-100"
//             >
//               Submit
//             </Button>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default EditProfile;



import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

const EditProfile = () => {
  const { user } = useSelector((store) => store.auth);
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    profilePhoto: user?.profilePicture || "", // Fixed: Initialize correctly
    bio: user?.bio || "",
    gender: user?.gender || "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, profilePhoto: file }); // Fixed: Set file, not profilePhoto
    }
  };

  const selectChangeHandler = (value) => {
    setInput({ ...input, gender: value });
  };

  const editProfileHandler = async () => {
    const formData = new FormData();
    formData.append("bio", input.bio || ""); // Fixed: Ensure empty string if undefined
    formData.append("gender", input.gender || "");
    if (input.profilePhoto && input.profilePhoto instanceof File) { // Fixed: Check if file
      formData.append("profilePicture", input.profilePhoto); // Fixed: Match backend field
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/profile/edit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Fixed: Add auth
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updateUserData = {
          ...user,
          bio: res.data.user?.bio,
          profilePicture: res.data.user?.profilePicture, // Fixed: Corrected typo (userr -> user)
          gender: res.data.user?.gender,
        };
        dispatch(setAuthUser(updateUserData));
        navigate(`/profile/${user?._id}`); // Fixed: Corrected template literal
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-2xl mx-auto pl-10">
      <section className="flex flex-col w-full gap-6">
        <h1 className="font-bold">Edit Profile</h1>
        <div className="flex items-center justify-between bg-gray-200 rounded-xl p-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="Profile Picture" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h1>{user?.username || "Username"}</h1>
              <span>{user?.bio || "Bio here"}</span>
            </div>
          </div>
          <input
            ref={imageRef}
            onChange={fileChangeHandler}
            type="file"
            accept="image/*" // Fixed: Restrict to images
            className="hidden"
          />
          <Button
            onClick={() => imageRef?.current?.click()}
            className="bg-[#0095F6]"
          >
            Choose Photo
          </Button>
        </div>
        <div>
          <h1 className="font-bold text-2xl mb-2">Bio</h1>
          <textarea
            value={input.bio || ""}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            name="bio"
            cols={80}
            rows={3}
            placeholder="Write bio here"
            className="focus-visible:ring-transparent p-2"
          />
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Gender</h1> {/* Fixed: Consistent styling */}
          <Select
            value={input.gender || ""} // Fixed: Use value instead of defaultValue
            onValueChange={selectChangeHandler}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          {loading ? (
            <Button className="bg-blue-600 hover:bg-blue-100">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {/* Fixed: Corrected size */}
              Please wait...
            </Button>
          ) : (
            <Button
              onClick={editProfileHandler}
              className="bg-blue-600 hover:bg-blue-100"
            >
              Submit
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditProfile;