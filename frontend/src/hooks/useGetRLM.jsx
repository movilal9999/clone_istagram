// import { setPosts } from "@/redux/postSlice";
// import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "@/redux/postSlice";
import { setMessages } from "@/redux/chatSlice";

const useGetRLM = () => {
    const dispatch = useDispatch();
    const {socket} = useSelector(store=>store.socketio);
  const { messages } = useSelector((store) => store.chat);
  
  useEffect(() => {
    socket?.on('newMessage', (newMessage)  => {
        dispatch(setMessages([...messages, newMessage]));
    })
    
    return () => {
        socket?.off('newMessage');
    }   
  }, [messages, setMessages]);
};

export default useGetRLM;
