import { Product } from "../models/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const productList = asyncHandler(async (req, res) => {
    // #swagger.tags = ['Product']
    let data = await Product.find({userId: req.user.id, isDeleted: false});
    return res.status(200).json({
        success: true, 
        data: data
    })
});

export {
    productList
}