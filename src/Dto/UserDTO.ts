import { User as UserModel } from '@prisma/client';

export interface ResponseDTO {
    user?: UserModel;
    error?: string;
  }
  