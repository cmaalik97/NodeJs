import mongoose from "mongoose";
import express from "express";
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utility/swagger.js';
import studentRoutes from "./Routes/student.js"
import transactionRoutes from './Routes/transactions.js';
import userRoutes from "./Routes/user.js"
import dotenv from "dotenv"
import { globalError } from "./Middleware/globalError.js";
import { limiter } from "./Middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/test', (req, res) => {
    res.send('Express server is working!');
});

app.use(limiter);

// app.use("/" , studentRoutes )
app.use("/",userRoutes )
app.use('/transactions', transactionRoutes);



app.use(helmet());
app.use(globalError)


//connect to mongodb
mongoose.connect(process.env.NODE_ENV == "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
    .then(()=>console.log("✅ MongoDB connected"))
    .catch((err)=>console.log("❌ connection error:" , err))


app.listen(PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})