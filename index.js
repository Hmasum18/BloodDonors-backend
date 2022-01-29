import dotenv from 'dotenv';
import express from 'express';// function
import morgan from 'morgan';
import router from './routes/routes.js'
import cors from 'cors';


dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api",router);

app.listen(port, function(){
    console.log(`Server listening at PORT ${port}`);
})