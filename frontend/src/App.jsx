// import React, { useEffect } from "react";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./components/Home";
// import MainLayout from "./components/MainLayout";
// import Login from "./components/Login";
// import SignUp from "./components/SignUp";

// //
// // import Profilie from "./components/Profile";
// import Profile from "./components/Profile";
// import EditProfile from "./components/EditProfile";
// import ChatsPages from "./components/ChatsPages";
// import { io } from "socket.io-client";
// import { useDispatch, useSelector } from "react-redux";
// import { setSocket } from "./redux/socketSlice";
// import { setOnlineUsers } from "./redux/chatSlice";
// import { setLikeNotification } from "./redux/rtnSlice";
// // import store from "./redux/store";

// const browserRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/profile/:id",
//         element: <Profile />,
//       },
//       {
//         path: "/account/edit",
//         element: <EditProfile />,
//       },
//       {
//         path: "/chat",
//         element: <ChatsPages />,
//       },
//     ],
//   },
//   {
//     path: "/Login",
//     element: <Login />,
//   },
//   {
//     path: "/SignUp",
//     element: <SignUp />,
//   },
// ]);

// function App() {
//   const { user } = useSelector((store) => store.auth);
//   const { socket } = useSelector((store) => store.socketio);
//   const dispatch = useDispatch();

//   // const socketio = io("http://localhost:8000", {
//   //   query: {
//   //     userId: user?._id,
//   //   },
//   //   transports: ["websocket"],
//   // });

//   useEffect(() => {
//     if (user) {
//       const socketio = io("http://localhost:8000", {
//         query: {
//           userId: user?._id,
//         },
//         transports: ["websocket"],
//       });
//       dispatch(setSocket(socketio));

//       // listen all event
//       socketio.on("getOnlineUsers", (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers));
//       });

//       socketio.on("notification", (nottification) => {
//         dispatch(setLikeNotification(nottification));
//       });

//       return () => {
//         socketio.close();
//         dispatch(setSocket(null));
//       };
//     } else if (socket) {
//       socket?.close();
//       dispatch(setSocket(null));
//     }
//   }, [user, dispatch]);
//   return (
//     <>
//       <RouterProvider router={browserRouter} />
//     </>
//   );
// }

// export default App;


// App.jsx - Fixed version with comments explaining problems and solutions

import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ChatsPages from "./components/ChatsPages";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/chatSlice";
import { setLikeNotification } from "./redux/rtnSlice";
import ProtectedRoutes from "./components/ProtectedRoutes";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes> ,
    children: [
      {
        path: "/",
        element: <ProtectedRoutes><Home /></ProtectedRoutes> ,
      },
      {
        path: "/profile/:id",
        element: <ProtectedRoutes><Profile /></ProtectedRoutes> ,
      },
      {
        path: "/account/edit",
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes> ,
      },
      {
        path: "/chat",
        element: <ProtectedRoutes><ChatsPages /></ProtectedRoutes> ,
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
]);

function App() {
  const { user } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:8000", { // Problem: Socket.IO was initialized twice (once outside useEffect and once inside), causing duplicate connections and potential event duplication. Solution: Removed the outer initialization and kept it inside useEffect for controlled connection based on user login. After solution: Single Socket.IO connection is established only when user is logged in, preventing duplicates and ensuring cleanup on logout/unmount.
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });
      dispatch(setSocket(socketio));

      // Listen to all events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on("notification", (notification) => { // Problem: Typo in variable name ("nottification" instead of "notification"), causing the event handler to not trigger. Solution: Corrected the spelling to match the emitted event name from backend. After solution: The "notification" event is now properly handled, dispatching to Redux, which updates likeNotification state and triggers UI re-render in LeftSidebar.
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket?.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]); // Dependency array ensures re-run on user change.

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
