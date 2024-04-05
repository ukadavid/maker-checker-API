
import { User as Request } from '@prisma/client';

export interface requestDTO {
    user?: Request;
    error?: string;
  }
  