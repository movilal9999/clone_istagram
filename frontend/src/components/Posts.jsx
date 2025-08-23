import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = () => {
  const { posts } = useSelector((store) => store.post);
  // console.log("Posts from Redux:", posts);

  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;



// import React from "react";
// import Post from "./Post";
// import { useSelector } from "react-redux";

// const Posts = () => {
//   const { posts, loading } = useSelector((store) => store.post);
//   console.log("Posts from Redux:", posts);

//   if (loading) {
//     return <p>Loading posts...</p>;
//   }

//   if (!posts || posts.length === 0) {
//     return <p>No posts available.</p>;
//   }

//   return (
//     <div>
//       {posts.map((post) => (
//         <Post key={post._id} post={post} />
//       ))}
//     </div>
//   );
// };

// export default Posts;


// import React from "react";
// import Post from "./Post";
// import { useSelector } from "react-redux";

// const Posts = () => {
//   const { posts, loading } = useSelector((store) => store.post);
//   console.log("Posts from Redux:", posts);

//   if (loading) {
//     return <p>Loading posts...</p>;
//   }

//   if (!Array.isArray(posts) || posts.length === 0) {
//     return <p>No posts available.</p>;
//   }

//   return (
//     <div>
//       {posts.map((post) => (
//         <Post key={post._id} post={post} />
//       ))}
//     </div>
//   );
// };

// export default Posts;
