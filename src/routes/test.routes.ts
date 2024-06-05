import express from 'express';
import { Request, Response } from 'express';
import {checkToken} from '../middleware/authMiddleware'
import {checkRole} from '../middleware/checkRoleMiddleware'
import {User} from '../models/user'

const router = express.Router();

router.route('/').get((req: Request, res: Response) => {
    res.json({
      status: 'success',
      message: 'Welcome to Node.js, we are happy to see you',
    });
})

router.route('/auth').post(checkToken, checkRole('admin', 'user'), async (req: Request, res: Response)=>{
    const user = await User.findOne({email: res.locals.user.email});
    
    res.status(200).json({status: "success", data: {message: "This token is valid", user: user}});
})

export default router