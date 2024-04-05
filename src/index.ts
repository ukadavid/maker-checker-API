import express, { query } from 'express';
import {PORT } from './secrets'
import userRoutes from './routes/userRoutes';
import { PrismaClient } from '@prisma/client';

const app = express()

app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send("Working");
})

export const prismaClient = new PrismaClient({
    log: ['query']
})


app.listen(PORT, () => {
    console.log("working");
})