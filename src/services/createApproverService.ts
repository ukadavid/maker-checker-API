import { PrismaClient, Role, RequestType } from '@prisma/client';
import { CustomError } from '../exceptions';

const prisma = new PrismaClient();

export async function createApprover(username: string, email: string, requestTypes: RequestType[]): Promise<any> {
  try {

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return { error: 'User with this email already exists'};
    }
    
    const approver = await prisma.user.create({
      data: {
        username,
        email,
        role: Role.APPROVER,
        Approver: {
          create: {
            approvedRequestTypes: {
              set: requestTypes,
            },
          },
        },
      },
      include: {
        Approver: true,
      },
    });

    return approver;
  } catch (error) {
    return { error: 'Failed to create approver'};
  }
}
