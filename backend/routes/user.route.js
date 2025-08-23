import express from 'express';
import { followOrUnfollow, getProfile, login, logout, register, suggestedUser, editProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import upload from '../middleware/multer.js';


const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated, getProfile);
router.route('/profile/edit').post(isAuthenticated, upload.single('profilePicture'), editProfile );

router.route('/suggested').get(isAuthenticated, suggestedUser);
router.route('/followorunfollow/:id').post(isAuthenticated, followOrUnfollow);

export default router;

// router.route('account/edit').post(isAuthenticated, upload.single('profilePicture'), editProfile );





