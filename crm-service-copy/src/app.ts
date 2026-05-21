import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';


export const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// api routes
app.use('/api', userRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Not Found' });
})