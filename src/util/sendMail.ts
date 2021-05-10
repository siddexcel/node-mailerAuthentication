const nodemailer = require('nodemailer');
import options from '../mailer-config.json'


export async function sendMail(email: string, otp: string) {
    try {
        const transporter = nodemailer.createTransport(options);
        const send = await transporter.sendMail({ from: 'testnt64@gmail.com', to: email, subject: 'OTP', html: `your otp for verification ${otp}` });
        return 'mail sended'
    } catch (err) {
        throw err
    }
}