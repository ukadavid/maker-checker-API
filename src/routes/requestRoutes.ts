import express from 'express';
import { createRequest } from '../controllers/requestController';

const router = express.Router();

// POST /requests
router.post('/', createRequest);

export default router;
