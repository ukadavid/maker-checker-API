import { PrismaClient, Role, RequestType } from '@prisma/client';
import { CustomError } from '../exceptions';

const prisma = new PrismaClient();

export async function createApprover(username: string, email: string, requestTypes: RequestType[]): Promise<any> {
  try {
    // Check if a user with the provided email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new CustomError(400, 'User with this email already exists');
    }

    // Create the approver if no existing user is found
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
    throw new CustomError(500, 'Failed to create approver');
  }
}
