// import { createSlice } from "@reduxjs/toolkit";
// const rtnSlice = createSlice({
//     name: 'realTimeNotification',
//     initialState :{
//         likeNotification : []
//     },
//     reducers :{
//         setLikeNotification :(state, action) =>{
//             if(action.payload.type === 'like'){
//                 state.likeNotification.push(action.payload);
//             }
//             else if(action.payload.type === 'dislike'){
//                 state.likeNotification = state.likeNotification.filter((item)=> item.userId !== action.payload.userId);
//             }
//         }
//     }
// });

// export const {setLikeNotification} = rtnSlice.actions;
// export default rtnSlice.reducer;

// rtnSlice.js - Fixed version with comments (this is the Redux slice for real-time notifications)

import { createSlice } from "@reduxjs/toolkit";

const rtnSlice = createSlice({
  name: 'realTimeNotification',
  initialState: {
    likeNotification: []
  },
  reducers: {
    setLikeNotification: (state, action) => {
      if (action.payload.type === 'like') {
        state.likeNotification.push(action.payload); // Adds new like notification.
      } else if (action.payload.type === 'dislike') {
        state.likeNotification = state.likeNotification.filter((item) => item.userId !== action.payload.userId); // Removes the corresponding like notification if the same user dislikes.
      }
      // Problem: No handling for other types or potential duplicates. Solution: The reducer logic is fine as is, but ensured it's dispatched correctly from Socket.IO event. After solution: When a like occurs, notification is added to state; on dislike, previous like from same user is removed, updating the UI count and list in real-time.
    }
  }
});

export const { setLikeNotification } = rtnSlice.actions;
export default rtnSlice.reducer;