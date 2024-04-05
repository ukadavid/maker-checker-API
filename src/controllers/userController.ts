import { Request, Response } from 'express';
import { createUser as createUserFromService } from '../services/userService';

export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { username, email, role } = req.body;

    const user = await createUserFromService(username, email, role);

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
