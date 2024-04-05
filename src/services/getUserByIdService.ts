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
            return { error: 'User not found' };
        }

        return user;
    } catch (error) {
        return { error: 'Failed to fetch user details'};
    }
}
