import { Request, Response, NextFunction } from "express";
import { Category } from "../models/category";

export const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const categories = await Category.find();
    res.status(200).json({
        status: "Success",
        data: {
            categories,
        },
    });
}

export const getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.categoryId;
    const target_category = await Category.findById(id);

    res.status(200).json({
        status: "Success",
        data: {
            category: target_category,
        },
    });
}

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {title} = req.body;
    const created_category= await Category.create({
        title,
    });

    res.status(200).json({
        status: "Success",
        data: {
            category: created_category,
        },
    });
}

export const updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.createdId;
    const updated_category = await Category.findByIdAndUpdate({_id: id}, {$set: {...req.body}})

    res.status(200).json({
        status: "Success",
        data: {
            category: updated_category,
        },
    });
}

export const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.categoryId;
    await Category.findByIdAndDelete({_id: id});

    res.status(200).json({
        status: "Success",
        data: null,
    });
}