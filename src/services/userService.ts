import { PrismaClient, Role as PrismaRole } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(username: string, email: string, role: PrismaRole): Promise<any> {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        role
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}
