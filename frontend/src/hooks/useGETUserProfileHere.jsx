// import { setPosts } from "@/redux/postSlice";
import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGETUserProfileHere = (userId) => {
  const dispatch = useDispatch();
//   const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
     
        const res = await axios.get(`http://localhost:8000/api/v1/user/${userId}/profile`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUserProfile();
  }, [userId]);
};

export default useGETUserProfileHere;
