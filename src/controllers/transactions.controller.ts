import { Request, Response, NextFunction } from "express";
import { Transaction } from "../models/transaction";
import { User } from "../models/user";

export const getAllTransactions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = await User.find({email: res.locals.user.email});
    let queryObject = {};
    // if(user.role == 'user'){
    //     queryObject._id = user._id;
    // }
    const transaction = await Transaction.find(queryObject);
    res.status(200).json({
        status: "Success",
        data: {
            transaction,
        },
    })
}