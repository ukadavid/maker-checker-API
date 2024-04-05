import { PrismaClient } from '@prisma/client';
import { CustomError } from '../exceptions';

const prisma = new PrismaClient();

export async function getUserByIdService(userId: string): Promise<any> {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                Approver: true, 
                Request: true,  
            },
        });

        if (!user) {
            throw new CustomError(404, 'User not found');
        }

        return user;
    } catch (error) {
        throw new CustomError(500, 'Failed to fetch user details');
    }
}
