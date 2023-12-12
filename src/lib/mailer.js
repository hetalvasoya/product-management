import nodeMailer from 'nodemailer';
import { MESSAGES, smtpConfig } from '../constants/appConstants';

const transporter = nodeMailer.createTransport({
    service: smtpConfig.SERVICE,
    auth: {
      user: smtpConfig.EMAIL,
      pass: smtpConfig.PASSWORD,
    }
}, { sendmail: true });


async function sendEmail(mailOptions) {
    await transporter.verify(async (error) => {
        if (error) {
        return { error: MESSAGES.SOMETHING_WENT_WRONG };
        }
    });
    const emailResponse = await transporter.sendMail(mailOptions);
    if (!emailResponse.messageId) {
        return { error: MESSAGES.SOMETHING_WENT_WRONG };
    }
    return { result: 'Email sent successfully' };
}

export const sendPhoneLoginEmail = async(otp, toEmail) => {
    const mailOptions = {
        html: `<p> Dear Customer, \n
                    Use ${otp} as the OTP to log in to your Inventory managment app account and start shopping.</p>`,
        from: smtpConfig.FROM_EMAIL,
        to: toEmail,
        subject: 'Inventory Management OTP to login',
    };
    const sendMailResponse = await sendEmail(mailOptions);
    return sendMailResponse;
}