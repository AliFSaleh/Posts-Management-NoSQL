import express from 'express';
import {getCategories, getCategory, createCategory, updateCategory, deleteCategory} from '../controllers/categories.controller'
import {validate} from '../middleware/validate'
import {createCategorySchema, updateCategorySchema} from '../schemas/category.schema'
import {checkToken} from '../middleware/authMiddleware';
import {checkRole} from '../middleware/checkRoleMiddleware';

const router = express.Router();

router.route('/')
        .get(getCategories)
        .post(checkToken, checkRole("admin"), validate(createCategorySchema), createCategory)
router.route('/packageId')
        .get(checkToken, checkRole("admin"), getCategory)
        .patch(checkToken, checkRole("admin", validate(updateCategorySchema)), updateCategory)
        .delete(checkToken, checkRole("admin"), deleteCategory)

export default router;