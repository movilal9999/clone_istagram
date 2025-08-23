        // import { setPosts } from "@/redux/postSlice";
        import axios from "axios";
        import { useEffect } from "react";
        import { useDispatch, useSelector } from "react-redux";
        import { setLoading } from "@/redux/postSlice";
        import { setMessages } from "@/redux/chatSlice";


        const useGetAllMessage = () => {
            const {selectedUser} = useSelector(store=>store.auth);
          const dispatch = useDispatch();
          useEffect(() => {
            const fetchAllMessage = async () => {
              try {
                dispatch(setLoading(true));
                dispatch(setLoading()); // Set loading state
                const res = await axios.get(`http://localhost:8000/api/v1/message/all/${selectedUser._id}`, {
                  withCredentials: true,
                });
                if (res.data.success) {
                //   console.log("Fetched posts:", res.data.posts);
                  dispatch(setMessages(res.data.messages));
                }
              } catch (error) {
                console.error("Error fetching posts:", error);
              }
              finally{
                dispatch(setLoading(false));
              }
            };
            if(selectedUser){

              fetchAllMessage();
            }
          }, [selectedUser, dispatch]);
        };

        export default useGetAllMessage;


//         import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "@/redux/postSlice";
// import { setMessages } from "@/redux/chatSlice";

// const useGetAllMessage = () => {
//   const { selectedUser } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchAllMessage = async () => {
//       // Fix: Only fetch messages if selectedUser._id is valid
//       if (!selectedUser?._id || selectedUser._id === "undefined" || !selectedUser._id.match(/^[0-9a-fA-F]{24}$/)) {
//         console.error("No valid user selected for fetching messages");
//         return;
//       }
//       try {
//         dispatch(setLoading(true)); // Set loading state
//         const res = await axios.get(`http://localhost:8000/api/v1/message/all/${selectedUser._id}`, {
//           withCredentials: true,
//         });
//         if (res.data.success) {
//           dispatch(setMessages(res.data.messages));
//         }
//       } catch (error) {
//         console.error("Error fetching messages:", error.response?.data?.message || error.message);
//       } finally {
//         dispatch(setLoading(false)); // Reset loading state
//       }
//     };
//     // Fix: Only call fetchAllMessage if selectedUser exists
//     if (selectedUser) {
//       fetchAllMessage();
//     }
//   }, [selectedUser, dispatch]);
// };

// export default useGetAllMessage;
