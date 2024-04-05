import { Request, Response } from 'express';
import { createApprover as createApproverFromService } from '../services/createApproverService';
import { CustomError } from '../exceptions';

export async function createApprover(req: Request, res: Response): Promise<void> {
  try {
    const { username, email, requestTypes } = req.body;

    const approver = await createApproverFromService(username, email, requestTypes);

    res.status(201).json(approver);
  } catch (error) {

      res.status(500).json({ error: 'Internal server error' });
    }
  }

