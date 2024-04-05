import express from 'express';
import { getUserById } from '../controllers/getUserIdController';


const router = express.Router();

router.get('/:userId', getUserById);

export default router;
