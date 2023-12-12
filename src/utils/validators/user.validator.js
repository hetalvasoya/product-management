import {check}  from "express-validator"

const validate = (method) => {
    switch(method) {
        case 'createUser': {
            return [
                check('firstName').not().isEmpty().withMessage(`firstName cannot be blank.`),
                check('lastName').not().isEmpty().withMessage(`lastName cannot be blank.`),
                check('password').not().isEmpty().withMessage(`password cannot be blank.`)
                    .bail().isLength({ min: 6, max: 12 }).withMessage('Password must be between 6 and 12 characters.')
            ]
        }        
        case 'loginUser': {
            return [
                check('password').not().isEmpty().withMessage(`password cannot be blank.`)
                    .bail().isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 12 characters.')
            ]
        }
        case 'sendLoginOtp': {
            return [
                check('phone').not().isEmpty().withMessage(`phone cannot be blank.`)
                    .bail().isLength({ min: 10, max: 12 }).withMessage('Provide valid mobile number.')
            ]
        }
        case 'verifyLoginOtp': {
            return [
                check('phone').not().isEmpty().withMessage(`otp cannot be blank.`)
                    .bail().isLength({ min: 6, max: 12 }).withMessage('Incorrect OTP entered. Please enter the correct OTP')
            ]
        }
    }
}

export default validate;