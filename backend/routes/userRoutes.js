import express from "express";
import { authUser, registrUser, logoutUser, getUserById,getUserProfile,updateUser,updateUserProfile,getUsers,deleteUser  } from "../controllers/userController.js";
const router = express.Router();


router.route('/').post(registrUser);
router.route('/').get(getUsers);

router.route('/login').post(authUser);
router.route('/logout').post(logoutUser);

router.route('/profile').get(getUserProfile);
router.route('/profile').put(updateUserProfile);

router.route('/:id').delete(deleteUser);
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUser);

export default router;