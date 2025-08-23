        import { Conversation } from "../models/conversation.model.js";
        import { getReceiverSocketId, io } from "../socket/socket.js";
        import {Message} from "../models/message.model.js";

        //real time conversation
        export const sendMessage = async (req, res)=>{
            try {
                const senderId = req.id;
                const receiverId = req.params.id;
                const {textMessage:message} = req.body;
                console.log(message);

                let conversation = await Conversation.findOne({
                    participants:{$all:[senderId, receiverId]}
                });
                //establish the Conversation if not started yet,
                if(!conversation){
                    conversation = await Conversation.create({
                        participants:[senderId, receiverId]
                    })
                };
                const newMessage = await Message.create({
                    senderId,
                    receiverId,  
                    message
                });
                if(newMessage) conversation.messages.push(newMessage._id);
                await Promise.all([conversation.save(), newMessage.save()])

                //implement sockets for real time data transfer
                const receiverSocketId = getReceiverSocketId(receiverId);
                if(receiverSocketId){
                    io.to(receiverSocketId).emit('newMessage', newMessage);
                }


                return res.status(200).json({
                    success:true,
                    newMessage
                })

            } catch (error) {
                console.log(error);
                
                
            }
        }


        export const getMessage = async (req, res) =>{
            try {
                const senderId = req.id;
                const receiverId = req.params.id;
                const conversation = await Conversation.findOne({
                    participants:{$all:[senderId, receiverId]}
                }).populate('messages');
                if(!conversation) return res.status(200).json({success:true, messages:[]});
                return res.status(200).json({success:true, messages:conversation?.messages});
            } catch (error) {
                console.log(error);
                
                
            }
        }

//         export const getMessage = async (req, res) => {
//   try {
//     const senderId = req.id;
//     const receiverId = req.params.id;
//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] }
//     }).populate('messages');
    
//     console.log("API Response (Messages):", conversation?.messages || []); // Add this log
    
//     if (!conversation) return res.status(200).json({ success: true, messages: [] });
//     return res.status(200).json({ success: true, messages: conversation?.messages });
//   } catch (error) {
//     console.log(error);
//   }
// };



//         import mongoose from 'mongoose';
// import { Conversation } from '../models/conversation.model.js';
// import { Message } from '../models/message.model.js';
// import { User } from '../models/user.models.js'; // Import User model for validation
// import { getReceiverSocketId, io } from '../socket/socket.js';

// // Real-time conversation
// export const sendMessage = async (req, res) => {
//   try {
//     //  const { user } = useSelector((store) => store.auth);
//     const senderId = req.id;
//     const receiverId = req.params.id;
//     const { textMessage: message } = req.body;

//     // Fix: Validate senderId, receiverId, and message
//     if (!senderId || senderId === 'undefined' || !mongoose.Types.ObjectId.isValid(senderId)) {
//       return res.status(400).json({ success: false, message: 'Invalid sender ID' });
//     }
//     if (!receiverId || receiverId === 'undefined' || !mongoose.Types.ObjectId.isValid(receiverId)) {
//       return res.status(400).json({ success: false, message: 'Invalid receiver ID' });
//     }
//     if (!message || message.trim() === '') {
//       return res.status(400).json({ success: false, message: 'Message cannot be empty' });
//     }

//     // Fix: Verify users exist
//     const sender = await User.findById(senderId);
//     const receiver = await User.findById(receiverId);
//     if (!sender || !receiver) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Find or create conversation
//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });
//     if (!conversation) {
//       conversation = new Conversation({
//         participants: [senderId, receiverId],
//       });
//       // Fix: Save conversation immediately to avoid CastError
//       await conversation.save();
//     }

//     // Create new message
//     const newMessage = new Message({
//       sender: senderId,
//       receiver: receiverId,
//       message,
//     });
//     await newMessage.save(); // Save message first

//     // Add message to conversation
//     conversation.messages.push(newMessage._id);
//     await conversation.save(); // Save conversation after pushing message

//     // Implement sockets for real-time data transfer
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit('newMessage', newMessage);
//     }

//     return res.status(201).json({
//       success: true,
//       newMessage,
//     });
//   } catch (error) {
//     // Fix: Return error response instead of just logging
//     console.error('Send message error:', error);
//     return res.status(500).json({ success: false, message: 'Server error', error: error.message });
//   }
// };

// export const getMessage = async (req, res) => {
//   try {
//     const senderId = req.id;
//     const receiverId = req.params.id;

//     // Fix: Validate senderId and receiverId
//     if (!senderId || senderId === 'undefined' || !mongoose.Types.ObjectId.isValid(senderId)) {
//       return res.status(400).json({ success: false, message: 'Invalid sender ID' });
//     }
//     if (!receiverId || receiverId === 'undefined' || !mongoose.Types.ObjectId.isValid(receiverId)) {
//       return res.status(400).json({ success: false, message: 'Invalid receiver ID' });
//     }

//     // Fix: Verify users exist
//     const sender = await User.findById(senderId);
//     const receiver = await User.findById(receiverId);
//     if (!sender || !receiver) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Find conversation and populate messages
//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     }).populate('messages');
//     if (!conversation) {
//       return res.status(200).json({ success: true, messages: [] });
//     }

//     return res.status(200).json({ success: true, messages: conversation.messages });
//   } catch (error) {
//     // Fix: Return error response instead of just logging
//     console.error('Get message error:', error);
//     return res.status(500).json({ success: false, message: 'Server error', error: error.message });
//   }
// };


