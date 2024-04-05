import express from 'express';
import {PORT } from './secrets'
import userRoutes from './routes/userRoutes';
import { handleErrors } from './exceptions';

const app = express()

app.use(express.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send("Working");
})

app.use(handleErrors);

app.listen(PORT, () => {
    console.log("working");
})