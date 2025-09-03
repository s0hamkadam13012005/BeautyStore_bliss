import express from 'express';
import cors from 'cors';
import { errorHandler, notFound } from './Middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
const app = express();
import authRoute from './routes/auth.route.js';
import productRoute from './routes/product.route.js';
import bannerRoute from './routes/banner.route.js';
import userRoute from './routes/user.route.js';

app.use(express.json());

app.use(cors());

app.use(cookieParser());

/*app.post("/api/v1/auth/register", registerUser);
app.post("/api/v1/auth/login", loginUser);
app.post("/api/v1/auth/logout", logoutUser);
*/
app.use(notFound);
app.use(errorHandler);


app.use('/api/v1/auth', authRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/banner',bannerRoute);
app.use('/api/v1/users',userRoute);

export default app;