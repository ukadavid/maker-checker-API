import { Request, Response } from 'express';
import { createUser as createUserFromService, CreateUserResponse } from '../services/userService';
import { ResponseDTO } from '../Dto/userDTO';


export async function createUser(req: Request, res: Response): Promise<void> {
    try {
        const { username, email, role } = req.body;

        const response: ResponseDTO = await createUserFromService(username, email, role);

        if (response.user) {
          res.status(201).json(response.user);
        } else {
          res.status(400).json({ error: response.error });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}