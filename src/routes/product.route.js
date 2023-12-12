import { Router } from "express";
import { validateToken } from "../middleware/validateToken.js";
import { productList } from "../contollers/product.controller.js";

const router = Router();

router.route('/get-product-list')
    .post(validateToken, productList);


export default router;