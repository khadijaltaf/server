import express from "express";
import {config} from 'dotenv';
import bodyParser from "body-parser";
import adminRouter from "./routes/adminroutes.js";
import mainRouter from "./routes/mainroutes.js";
import { connectDB } from "./config/db.js";

const app = express();
config();
connectDB();


app.use(bodyParser.json());
app.use('/admin' , adminRouter);
app.use('/main' , mainRouter);

app.listen(process.env.PORT),()=>{
   console.log("server is on PORT:" ,process.env.PORT);
}
 