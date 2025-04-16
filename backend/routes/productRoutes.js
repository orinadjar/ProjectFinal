import express from "express";
const router = express.Router();
import { getProducts, getProductsById, getCategories } from "../controllers/productController.js";

router.route('/categories').get(getCategories);
router.route('/').get(getProducts);
router.route('/:id').get(getProductsById);

export default router;