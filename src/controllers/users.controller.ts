import { NextFunction, Request, Response } from 'express';
import {User} from '../models/user';
import {Transaction} from '../models/transaction';
import AppError from '../utils/appError';

export const getMyProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = await User.findOne({email: res.locals.user.email});
    // const user = res.locals.user;
    
    res.status(200).json({
        status: "success",
        data: {
            user,
        },
    })
}

export const getUserAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const user = User.findById(id);

    res.status(200).json({
        status:"Success",
        data: {
            user,
        },
    })
}

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            results: users.length,
            data: {
                users,
            },
        })
    } catch (err: any) {
        next(new AppError(400, err.message));
    }
}

export const createUserAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {name, email, password, role} = req.body;
    const oldUser = await User.findOne({email});
    if(oldUser){
        return next(new AppError(403, 'this email is used before'))
    }

    const user = await User.create({email, name, password, role});

    res.status(200).json({
        status:"Success",
        data: {
            user,
        },
    })
}

export const updateUserAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const {name, email, password, role} = req.body;
    // const oldUser = User.findOne({email}).where()
    const user = await User.updateOne({_id: id}, {$set: {...req.body}});

    res.status(200).json({
        status:"Success",
        data: {
            user,
        },
    })
}

export const deleteUserAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await User.deleteOne({_id: req.params.id});
    res.status(200).json({
        status:"Success",
        data: null,
    })
}

export const chargeAmount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.userId;
    const user = await User.findById(id);
    user.amount += req.body.amount;
    user.save();

    await Transaction.create({
        user: user,
        package: null,
        type: 'charge_amount'
    })

    res.status(200).json({
        status: "Success",
        data: {
            user,
        }
    })
}