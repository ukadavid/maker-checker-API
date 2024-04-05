import express from 'express';
import { createRequest } from '../controllers/requestController';

const router = express.Router();


router.post('/:requestId', createRequest);

export default router;
