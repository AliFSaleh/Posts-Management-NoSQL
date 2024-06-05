import express from 'express';
import {getAllTransactions} from '../controllers/transactions.controller'
import {checkToken} from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
        .get(checkToken, getAllTransactions)

export default router