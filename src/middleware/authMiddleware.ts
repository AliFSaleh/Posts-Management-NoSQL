import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express'
import AppError from '../utils/appError'
import {User} from '../models/user'

export const checkToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {        
        let access_token;
        if(req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            access_token = req.headers.authorization.split(' ')[2];
        }

        if(!access_token){
            return next(new AppError(401, 'You are not logged in'));
        }

        const decoded = jwt.verify(access_token, process.env.JWT_SECRET_TOKEN);
        
        if (!decoded) {
            return next(new AppError(401, 'Invalid token or user does not exist'));
        }
        res.locals.user = decoded;

        next();
    } catch (err: any) {
        next(err);
    }

}