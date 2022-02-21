import dotenv from 'dotenv';

import express from 'express';// function
import morgan from 'morgan';
import router from './routes/routes.js'
import cors from 'cors';
import {messageSocket} from "./utils/message_socket.js";
import bodyParser from "body-parser";


dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api",router);

messageSocket(app, port);

// const server = app.listen(port, function(){
//     console.log(`Server listening at PORT ${port}`);
// })
//
// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: ["GET", "POST"]
//     }
// });