import jwt from 'jsonwebtoken';
const isAuthenticated = async (req, res, next) =>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:'User not authenticated',
                success: false,
            });
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:'Invalid',
                success: false,
            });
        }
        req.id = decode.userId;// decode contain the userId and req.id let this is an variable
        next();// indicates that this middleware is completed and move forword

    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;



// import jwt from "jsonwebtoken";

// const isAuthenticated = (req, res, next) => { // [CHANGED: Line 3] Removed 'async' since jwt.verify is synchronous
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({
//         message: "User not authenticated",
//         success: false,
//       });
//     }

//     // [ADDED: Line 12] Validate SECRET_KEY to prevent undefined errors
//     if (!process.env.SECRET_KEY) {
//       throw new Error("Secret key is not defined");
//     }

//     // [CHANGED: Line 16] Removed 'await' and simplified jwt.verify
//     const decode = jwt.verify(token, process.env.SECRET_KEY);

//     // [REMOVED: Lines 12-16 in original] Removed redundant 'if (!decode)' check since jwt.verify throws errors for invalid tokens

//     // [CHANGED: Line 20] Use req.user instead of req.id for standard practice
//     req.user = { id: decode.userId };

//     // [ADDED: Line 22] Validate userId exists in token
//     if (!decode.userId) {
//       return res.status(401).json({
//         message: "Invalid token: User ID missing",
//         success: false,
//       });
//     }

//     next();
//   } catch (error) {
//     // [CHANGED: Line 28] Improved error handling to send response instead of just logging
//     console.error("Authentication error:", error.message);
//     return res.status(401).json({
//       message: error.message || "Invalid or expired token",
//       success: false,
//     });
//   }
// };

// export default isAuthenticated;