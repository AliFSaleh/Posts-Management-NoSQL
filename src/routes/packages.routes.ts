import express from 'express';
import {getPackages, getPackage, createPackage, updatePackage, deletePackage, subscribePackage} from '../controllers/packages.controller'
import {validate} from '../middleware/validate'
import {createPackageSchema, updatePackageSchema} from '../schemas/package.schema'
import {checkToken} from '../middleware/authMiddleware';
import {checkRole} from '../middleware/checkRoleMiddleware';

const router = express.Router();

router.route('/')
        .get(getPackages)
        .post(checkToken, checkRole("admin"), validate(createPackageSchema), createPackage)
router.route('/:packageId')
        .get(checkToken, checkRole("admin"), getPackage)
        .patch(checkToken, checkRole("admin", validate(updatePackageSchema)), updatePackage)
        .delete(checkToken, checkRole("admin"), deletePackage)
router.route('/:packageId/subscribe')
        .post(checkToken, subscribePackage)

export default router;