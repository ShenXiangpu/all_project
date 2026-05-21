import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app: Application = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 健康检查
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API 路由
app.use('/api/user', userRoutes);

// 404 处理
app.use((_req: Request, res: Response) => {
  res.status(404).json({ code: 404, message: '接口不存在' });
});

export default app;
