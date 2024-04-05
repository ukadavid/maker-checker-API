import express from 'express';
import { createApprover } from '../controllers/approvalController';

const router = express.Router();

router.post('/', createApprover);

export default router;
