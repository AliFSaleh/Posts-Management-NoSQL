import { Request, Response, NextFunction } from "express";
import { Package } from "../models/package";
import { User } from "../models/user";
import { Transaction } from "../models/transaction";
import AppError from "../utils/appError";

export const getPackages = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const packages = await Package.find();
    res.status(200).json({
        status: "Success",
        data: {
            packages,
        },
    });
}

export const getPackage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.packageId;
    const target_package = await Package.findById(id);

    res.status(200).json({
        status: "Success",
        data: {
            package: target_package,
        },
    });
}

export const createPackage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {title, price, postsNumber} = req.body;
    const created_package= await Package.create({
        title,
        price,
        postsNumber
    });

    res.status(200).json({
        status: "Success",
        data: {
            package: created_package,
        },
    });
}

export const updatePackage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.packageId;
    const updated_package = await Package.findByIdAndUpdate({_id: id}, {$set: {...req.body}})

    res.status(200).json({
        status: "Success",
        data: {
            package: updated_package,
        },
    });
}

export const deletePackage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.packageId;
    await Package.findByIdAndDelete({_id: id});

    res.status(200).json({
        status: "Success",
        data: null,
    });
}

export const subscribePackage = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.packageId;
    const user = await User.findOne({email: res.locals.user.email});
    const subscribed_package = await Package.findById(id);
    
    if(user.amount < subscribed_package.price){
        return next (new AppError(400, 'You have not enough mony for this package'));
    }
    
    user.amount -= subscribed_package.price;
    user.available_posts_count += subscribed_package.postsNumber;
    user.save();

    await Transaction.create({
        user: user,
        package: subscribed_package,
        type: 'pay_for_package'
    })

    res.status(200).json({
        status: "Success",
        data: null,
    });
}