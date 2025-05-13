import express from "express";
const router = express.Router();
import { getProducts, getProductsById, getCategories, createProduct } from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/categories').get(getCategories);
router.route('/').get(getProducts);
router.route('/:id').get(getProductsById);
router.route('/').get(getProducts).post(protect, admin, createProduct);

export default router;