import express from 'express'
import { validationError } from '../utils/errorHandler'
// import { verifyResendOtpCheck, verifySignupCheck } from '../validation/verifyValidation'
const router = express.Router()

router.post('/signup', validationError)

router.post('/resend-otp', validationError)

export default router