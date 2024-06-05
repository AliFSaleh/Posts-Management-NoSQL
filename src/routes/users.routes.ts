import express from 'express';
import {chargeAmount, createUserAccount, deleteUserAccount, getAllUsers, getMyProfile, getUserAccount, updateUserAccount} from '../controllers/users.controller';
import {checkToken} from '../middleware/authMiddleware';
import {checkRole} from '../middleware/checkRoleMiddleware';
import { validate } from '../middleware/validate';
import { chargeAmountSchema } from '../schemas/user.schema';

const router = express.Router();

router.route('/me')
            .get(checkToken, getMyProfile)
router.route('/')
            .get(getAllUsers)
            .post(checkToken, checkRole("admin"), createUserAccount)
router.route('/:id')
            .get(checkToken, checkRole("admin"), getUserAccount)
            .patch(checkToken, checkRole("admin"), updateUserAccount)
            .delete(checkToken, checkRole("admin"), deleteUserAccount)
router.route('/:userId/chargeAmount')
            .post(checkToken, checkRole("admin"), validate(chargeAmountSchema), chargeAmount)

export default router