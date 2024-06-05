import express from 'express';
import multer from 'multer';
import path from 'path';
import {getPosts, getPost, createPost, updatePost, deletePost} from '../controllers/posts.controller'
import {validate} from '../middleware/validate'
import {createPostSchema, updatePostSchema} from '../schemas/post.schema'
import {checkToken} from '../middleware/authMiddleware';

const upload = multer({dest: path.join(__dirname, '../uploads/posts_images/')});
const router = express.Router();

router.route('/')
        .get(getPosts)
        .post(checkToken, upload.single('thumbnail'), createPost)
router.route('/:postId')
        .get(checkToken, getPost)
        .patch(checkToken, validate(updatePostSchema), updatePost)
        .delete(checkToken, deletePost)

export default router;