import { Request, Response } from 'express';
import { getUserByIdService } from '../services/getUserByIdService';

export async function getUserById(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.params.userId;
        const user = await getUserByIdService(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
}
