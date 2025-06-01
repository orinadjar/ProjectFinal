import express from "express";
const router = express.Router();
import { getProducts, getProductsById, getCategories, createProduct, updateProduct, deleteProduct, createProductReview, getTopRatedProducts } from "../controllers/productController.js";
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/categories').get(getCategories);
router.get('/top', getTopRatedProducts);
router.route('/:id').get(getProductsById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;