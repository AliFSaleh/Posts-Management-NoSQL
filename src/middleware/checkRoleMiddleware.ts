import { Request, Response, NextFunction } from "express"
import {User} from "../models/user";
import AppError from "../utils/appError";

export const checkRole =
    (...role: any) => 
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findOne({email: res.locals.user.email});
        const userRole = user.role;
        const pass = role.includes(userRole)? true : false;
    
        if(!pass){
            return next(new AppError(401, 'this action is not authorized'));
        }    
        next();
    }