import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React, { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

import { readFileAsDataURL } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPosts } from "@/redux/postSlice";

const CreatePosts = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState();
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (e) => {
    const formData = new FormData();
    formData.append("caption", caption);
    if (imagePreview) formData.append("image", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/post/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} className=" flex justify-center items-center ">
      <DialogContent onInteractOutside={() => setOpen(false)} className="">
        <DialogHeader>Create New image</DialogHeader>
        <div className="flex items-center gap-3">
          <Avatar className="">
            <AvatarImage src={user?.profilePicture} alt="" />
            <AvatarFallback> CN </AvatarFallback>
          </Avatar>
          <div>
            <h1>{user?.username}</h1>
            <span>{user?.bio}</span>
          </div>
        </div>
        <Textarea
          value={user?.caption}
          onChange={(e) => setCaption(e.target.value)}
          className="focus-visible:ring-transparent border-none"
          placeholder="Write a Caption here...."
        />
        {imagePreview && (
          <div className="w-full h-64 flex items-center justify-center">
            <img
              src={imagePreview}
              alt="imag_previw"
              className="object-cover h-full w-full rounded-md"
            />
          </div>
        )}

        <input
          ref={imageRef}
          type="file"
          className="hidden"
          onChange={fileChangeHandler}
        />
        <Button onClick={() => imageRef.current.click()}>
          Select from Computer
        </Button>
        {imagePreview &&
          (loading ? (
            <Button onClick={createPostHandler}>
              <Loader2 className="mr-2 h-2 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              onClick={createPostHandler}
              type="submit"
              className="w-full "
            >
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePosts;
