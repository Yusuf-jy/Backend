import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db.js'
import router from './routes/authRoute.js';
import cors from "cors"

const app =express();
app.use(express.json());

app.use(cors())
const PORT=8000;
app.use('/tasks',router )



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  connectDB();
});

