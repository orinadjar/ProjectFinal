import express from "express";
const router = express.Router();
import { getProducts, getProductsById, getCategories, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/categories').get(getCategories);
router.route('/:id').get(getProductsById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/').get(getProducts).post(protect, admin, createProduct);

export default router;