import express from 'express';
import { createApprover } from '../controllers/createApprovalController';

const router = express.Router();

router.post('/', createApprover);

export default router;
