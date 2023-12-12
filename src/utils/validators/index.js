import { validationResult } from "express-validator";

const commonValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({ success: false, errors: errors.array() });
    }
    next();
}

export {
    commonValidator
}