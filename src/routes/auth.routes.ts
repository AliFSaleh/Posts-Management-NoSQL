import express from 'express'
import {register, login, logout} from '../controllers/auth.controller'
import {validate} from '../middleware/validate'
import {checkToken} from '../middleware/authMiddleware'
import {
    registerUserSchema,
    loginSchema,
} from '../schemas/user.schema'

const router = express.Router();

router.route('/register').post(validate(registerUserSchema), register)
router.route('/login').post(validate(loginSchema), login)
router.route('/logout').post(checkToken, logout)

export default router
