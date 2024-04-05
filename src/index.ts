import express, { query } from 'express';
import {PORT } from './secrets'
import userRoutes from './routes/userRoutes';
import { PrismaClient } from '@prisma/client';
import { handleErrors } from './exceptions';
import approvalRoute  from './routes/approvalRoute';

const app = express()

app.use(express.json());

app.use('/users', userRoutes);
app.use('/createApproval', approvalRoute);

app.use(handleErrors);

export const prismaClient = new PrismaClient({
    log: ['query']
})


app.listen(PORT, () => {
    console.log("working");
})