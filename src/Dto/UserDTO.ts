import { User as UserModel } from '@prisma/client';

export interface userDTO {
    user?: UserModel;
    error?: string;
  }
  