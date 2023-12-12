import { Router } from "express";
import { login, sendLoginOtp, signup, verifyLoginOtp } from "./../contollers/user.controller.js";
import validate from "../utils/validators/user.validator.js";
import { commonValidator } from "../utils/validators/index.js";

const router = Router();

router.route('/login')
    .post(validate('loginUser'), commonValidator, login);

router.route('/signup')
    .post(validate('createUser'), commonValidator, signup);

router.route('/send-login-otp')
    .post(validate('sendLoginOtp'), commonValidator, sendLoginOtp);

router.route('/verify-login-otp')
    .post(validate('verifyLoginOtp'), commonValidator, verifyLoginOtp);


export default router;
