import express, { Request, Response } from 'express';
import { User } from '../../models/todo';
import randtoken from 'rand-token';
import { validateMail } from '../util/validateMail';
import { sendMail } from '../util/sendMail';
import { StatusCodes } from '../constants/statusCode'

export async function verifyOtp(req: Request, res: Response){
    try {
        const { otp, token } = req.body;
        const user = await User.updateOne({ otp, token }, {
            $set: {
                verified: true
            }
        })
        if (user['n'] > 0) {
            return res.status(StatusCodes.SUCCESS).send({ 'message': 'user verified', 'success': true })
        } else {
            return res.status(StatusCodes.UNAUTHORIZE).send({ 'message': 'user not verified', 'success': false })
        }
    } catch (err) {
        throw err
    }
}


export async function sendOtp(req: Request, res: Response) {
    try {
        const { email } = req.body;
        const validateEmail = validateMail(email)
        if (!validateEmail) {
            return res.status(StatusCodes.INVALID).send({
                'message': 'Invalid email'
            })
        }
        const token = randtoken.generate(16);
        const otp = Math.floor(100000 + Math.random() * 900000)
        
        const user = await User.findOne({ email })
        if (user) {
            const response = await sendMail(email, otp.toString());
            const updateOtp = await User.updateOne({email : email}, {$set: { otp: otp.toString()}})
            return res.status(StatusCodes.CREATED).send({
                'token': user.token
            })
        }
        const saveUserDetail = User.build({ email, otp: otp.toString(), token: token, verified: false })
        const response = await sendMail(email, otp.toString());
        await saveUserDetail.save()
        return res.status(StatusCodes.CREATED).send({
            'token': token
        })
    } catch (err) {
        return res.status(StatusCodes.SERVER_ERROR).send({
            'message': 'Something went Wrong'
        })
    }
}
