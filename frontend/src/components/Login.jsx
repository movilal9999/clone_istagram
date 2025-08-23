import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import axios from "axios";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { setAuthUser } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const LoginHandler = async (e) => {
    e.preventDefault();
    console.log(input);

    try {
      setloading(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/Login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);

        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(()=>{
    if(user){
      navigate('/');
        }
  }, []);

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <form
        onSubmit={LoginHandler}
        className="rounded-xl shadow-2xl flex flex-col gap-5 p-8"
      >
        <div className="flex  flex-col items-center ">
          <h1 className="font-bold text-xl">Login</h1>
          <p className="text-sm">Login to entertainment in your free time</p>
        </div>

        <div className="flex flex-col">
          <span className="font-medium">Email</span>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        <div className="flex flex-col">
          <span className="font-medium">Password</span>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent my-2"
          />
        </div>

        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit">Login</Button>
        )}

        <span className="text-center text-black">
          Doesn't have an account?{" "}
          <Link to="/SignUp" className="text-blue-600">
            SignUp
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
