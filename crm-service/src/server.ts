import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║           CRM Backend Service Started                ║');
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log(`║  🚀 Server:   http://localhost:${PORT}                    ║`);
  console.log(`║  📦 Database: ${process.env.DB_HOST}:${process.env.DB_PORT}                   ║`);
  console.log(`║  🗄️  DB Name:  ${process.env.DB_NAME}                         ║`);
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log('║  Endpoints:                                          ║');
  console.log('║  POST /api/user/login  - 用户登录                    ║');
  console.log('║  GET  /api/user/info   - 获取用户信息                ║');
  console.log('║  GET  /health          - 健康检查                    ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('');
});
