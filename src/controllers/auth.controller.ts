import {Request, Response, NextFunction} from 'express';
import {User} from '../models/user';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError';

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {name, email, password} = req.body;

        const oldUser = await User.findOne({email: email});
        if(oldUser){
            return next(new AppError(400, 'The email is used before'));
        }

        const newUser = new User({
            name,
            email,
            password
        })
        const token = await jwt.sign({email: newUser.email, id: newUser._id}, process.env.JWT_SECRET_TOKEN);
        newUser.token = token;
        await newUser.save();

        res.status(200).json({status: "success", data: {user: newUser}});
    } catch (err: any) {
        next(err)
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new AppError(400, 'Validation error send email and password'));
    }

    const user = await User.findOne({email: email});
    if(!user){
        return next(new AppError(400, 'User not found'));
    }
    
    if(user.password != password){
        return next(new AppError(400, 'Password is not correct'));
    }

    const token = await jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET_TOKEN);
    user.token = token;
    await user.save();

    res.status(200).json({status: "success", data: {user: user}});
}

export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = await User.findOne({email: res.locals.user.email});
    user.token = '';
    await user.save();
    

    res.status(200).json({status: "success", data:{}});
}