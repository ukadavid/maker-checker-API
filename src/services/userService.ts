import { PrismaClient, Role, User as UserModel } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export interface CreateUserResponse {
  user?: UserModel;
  error?: string;
}

export async function createUser(username: string, email: string, role: Role): Promise<CreateUserResponse> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return { error: 'User with this email already exists' };
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        role,
      },
    });

    return { user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Internal server error' };
  }
}
