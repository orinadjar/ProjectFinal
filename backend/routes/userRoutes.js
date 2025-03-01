import express from "express";
import { authUser, registrUser, logoutUser, getUserById,getUserProfile,updateUser,updateUserProfile,getUsers,deleteUser  } from "../controllers/userController.js";
import {protect, admin} from '../middleware/authMiddleware.js';
const router = express.Router();


router.route('/').post(registrUser);
router.route('/').get(protect, admin, getUsers);

router.route('/login').post(authUser);
router.route('/logout').post(logoutUser);

router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);

router.route('/:id').delete(protect, admin, deleteUser);
router.route('/:id').get(protect, admin, getUserById);
router.route('/:id').put(protect, admin, updateUser);

export default router;