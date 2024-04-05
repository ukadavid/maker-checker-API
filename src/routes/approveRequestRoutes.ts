import express from 'express';
import { approveRequest } from '../controllers/approveRequestController';

const router = express.Router();

router.put('/:requestId/approve', approveRequest);

export default router;
