import {asyncHandler}  from "../utils/asyncHandler.js";
import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';
import { MESSAGES } from "../constants/appConstants.js";
import { sendOTP, verifyOTP } from "../lib/twilioSMS.js";
import { getToken } from "../utils/jwt.js";

const login = asyncHandler(async (req, res) => {
      // #swagger.tags = ['Auth']
    const { email, password, phone } = req.body;
    let query = {};
    if(email) {
        query = { email };
    } else if(phone) {
        query = { phone };
    }    
    const user = await User.findOne(query);    
    if(!user) {
       return res.status(200).json({success: false, message: 'User not exist.'});
    }
    if(user && !await bcrypt.compare(password, user.password)) {
        return res.status(200).json({success: false, message: MESSAGES.INVALID_CREDENTIALS})
    }
    res.status(200).json({success: true, data: user, token: getToken(user._id)})
});

const signup = asyncHandler(async (req, res) => {
    // #swagger.tags = ['Auth']
    const { firstName, lastName, email, password, phone } = req.body;
    if([email, phone].every((field) => field === '')) {
        return res.status(200).json({success: false, message: 'Email or Phone is required'});
    }
    let query = {};
    if(email) {
        query = { email };
    } else if(phone) {
        query = { phone };
    }
    const existedUser = await User.findOne(query);
    if(existedUser) {
       return res.status(200).json({success: false, message: 'User already exist.'});
    }
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phone
    });
    if(!user) {
        return res.status(500).json({success: false, message: MESSAGES.SOMETHING_WENT_WRONG});
    }
    res.status(200).json({success: true, message: 'You are registered.', data: user})
});

const sendLoginOtp = asyncHandler(async (req, res) => {
    // #swagger.tags = ['Auth']
    const { phone } = req.body;
    const user = await User.findOne({phone});
    if(!user) {
        return res.status(200).json({success: false, message: 'Mobile number is not registered Please try with email login.'});
    }
    await sendOTP(phone);
    res.status(200).json({success: true, message: `OTP has been sent to your verified mobile number`});
});

const verifyLoginOtp = asyncHandler(async (req, res) => {
    // #swagger.tags = ['Auth']
    const { phone, otp } = req.body;
    const otpResponse = await verifyOTP(phone, otp);
    if(otpResponse === 'approved') {
        let user = await User.findOne({phone}).select('firstName lastName email phone');
        res.status(200).json({success: true, data: user, token: getToken(user._id)});
    }
    return res.status(200).json({success: false, message: 'Invalid otp.'});
});

export { login, signup, sendLoginOtp, verifyLoginOtp }