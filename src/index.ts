import express, { query } from 'express';
import {PORT } from './secrets'
import { PrismaClient } from '@prisma/client';
import { handleErrors } from './exceptions';
import userRoutes from './routes/userRoutes';
import approvalRoute  from './routes/approvalRoute';
import requestRoutes from './routes/requestRoutes';
import approveRequestRoutes from './routes/approveRequestRoutes';
import getUserIDRoute from './routes/getUserIDRoute';

const app = express()

app.use(express.json());

app.use('/api/createRequester', userRoutes);
app.use('/api/createApprovalUser', approvalRoute);
app.use('/api/createrequests', requestRoutes);
app.use('/api', approveRequestRoutes);
app.use('/api', getUserIDRoute);

app.use(handleErrors);

export const prismaClient = new PrismaClient({
    log: ['query']
})


app.listen(PORT, () => {
    console.log("working");
})