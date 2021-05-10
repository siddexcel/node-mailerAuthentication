import express, { Request, Response } from 'express'
import { sendOtp, verifyOtp } from  '../controller/user'
const router = express.Router()

router.post('/api/verifyUser', verifyOtp)

router.post('/api/send-otp', sendOtp)

export { router as userRouter }