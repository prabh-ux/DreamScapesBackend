import { Server } from "http";
import express from 'express';
import AuthRouter from './Routes/AuthRouter.js';
import ImageRouter from './Routes/ImageRouter.js';
import SearchRouter from './Routes/SearchRouter.js'
import SaveRouter from './Routes/SaveRouter.js';
import FetchRouter from './Routes/FetchProjects.js'
import DeleteRouter from './Routes/DeleteRoute.js'
import NewsLetterRouter from './Routes/NewsLetterRoute.js'
import cors from 'cors';
import './Models/db.js';
import './utils/cloudnary.js';

const app=express();
app.use(express.json());
app.use(cors({
  origin: "https://dream-scapes-frontend.vercel.app", // ✅ replace * with exact domain in production
  credentials: true,
}));



app.use("/auth",AuthRouter);
app.use("/editor",ImageRouter);
app.use("/editor", SearchRouter);
app.use("/editor",SaveRouter);
app.use("/",FetchRouter);
app.use("/",DeleteRouter);
app.use("/",NewsLetterRouter);



const port=process.env.PORT||8080;

app.listen(port,()=>{

    console.log("server started at PORT "+ port);
})
