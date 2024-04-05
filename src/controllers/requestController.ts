import { Request, Response } from 'express';
import { createRequest as createRequestFromService } from '../services/requestService';

export async function createRequest(req: Request, res: Response): Promise<void> {
  try {
    // Put requesterId in the params
    const { requesterId, requestType, expiration } = req.body;

    const request = await createRequestFromService(requesterId, requestType, expiration);

    res.status(201).json(request);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
