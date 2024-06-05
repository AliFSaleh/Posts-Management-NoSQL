import { Request, Response, NextFunction } from "express";
import { Post } from "../models/post";
import { User } from "../models/user";
import multer from "multer";
const upload = multer({ dest: 'uploads/' })

export const getPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const posts = await Post.find();
    res.status(200).json({
        status: "Success",
        data: {
            posts,
        },
    });
}

export const getPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.postId;
    const post = await Post.findById(id);

    res.status(200).json({
        status: "Success",
        data: {
            post,
        },
    });
}

export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {title, content} = req.body;
    const user = await User.find({email: res.locals.user.email});
    const post= await Post.create({
        user,
        ...req.body
    });

    res.status(200).json({
        status: "Success",
        data: {
            post,
        },
    });
}

export const updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.postId;
    const post = await Post.findByIdAndUpdate({_id: id}, {$set: {...req.body}})

    res.status(200).json({
        status: "Success",
        data: {
            post,
        },
    });
}

export const deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.postId;
    await Post.findByIdAndDelete({_id: id});

    res.status(200).json({
        status: "Success",
        data: null,
    });
}