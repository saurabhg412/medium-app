import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';
import { cors } from 'hono/cors';


// Create the main Hono app
const app = new Hono<{
  Bindings : {
    DATABASE_URL:string,
    password:string
  }
}>();
app.use(cors());
app.route('/api/v1/user',userRouter);
app.route('/api/v1/post', postRouter);
export default app;