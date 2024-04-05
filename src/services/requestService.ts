import { PrismaClient, RequestType } from '@prisma/client';
import { CustomError } from '../exceptions';

const prisma = new PrismaClient();

export async function createRequest(requesterId: string, requestType: RequestType, expiration: Date): Promise<any> {
  try {
    const existingRequester = await prisma.user.findUnique({
      where: {
        id: requesterId,
      },
    });

    if (!existingRequester) {
      throw new CustomError(400, 'Invalid requester ID');
    }

    const today = new Date();
    if (expiration < today) {
      throw new CustomError(400, 'Invalid expiration date');
    }

    const request = await prisma.request.create({
      data: {
        requesterId,
        requestType,
        expiration,
      },
    });

    return request;
  } catch (error) {
    throw new CustomError(500, 'Failed to create request');
  }
}
