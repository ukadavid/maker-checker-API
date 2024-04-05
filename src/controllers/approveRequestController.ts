import { Request, Response } from 'express';
import  {approveRequestService} from '../services/approveRequestService';

export async function approveRequest(req: Request, res: Response): Promise<void> {
  try {
    const { requestId } = req.params; 
    const { approverId, status } = req.body
    const updatedRequest = await approveRequestService(requestId, approverId, status);

    res.status(200).json(updatedRequest); // Send success response with the updated request
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).json({ error: 'Failed to approve request' });
  }
}
