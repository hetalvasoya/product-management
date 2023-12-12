import twilio  from 'twilio';
import dotenv from 'dotenv';
import r from 'readline'
dotenv.config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } = process.env;

import { contryCode } from '../constants/appConstants.js';


const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


export const verifyOTP = async(recipientPhoneNumber, otpCode) => {
    const verification_check = await client.verify.v2
                                .services(TWILIO_SERVICE_SID).verificationChecks
                                .create({ to: `${contryCode.IND}${recipientPhoneNumber}`, code: otpCode });
                                console.log(verification_check);
    return verification_check.status;        
}

export const sendOTP = async (recipientPhoneNumber) => {    
    await client.verify.v2
    .services(TWILIO_SERVICE_SID)
    .verifications.create({ to: `${contryCode.IND}${recipientPhoneNumber}`, channel: "sms" }) 
    .then((verification) => console.log(verification.status))    
}
