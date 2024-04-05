import express from 'express';
import {PORT } from './secrets'

const app = express()

app.get('/', (req, res) => {
    res.send("Working");
})

app.listen(PORT, () => {
    console.log("working");
})