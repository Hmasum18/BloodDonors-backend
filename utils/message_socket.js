import {Server} from 'socket.io';
import MessageController from "../controller/message_controller.js";

const messageController = new MessageController();
export function messageSocket(app, port){
    const server = app.listen(port, function () {
        console.log(`Server listening at PORT ${port}`);
    })


    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    const userIdSocketMap = {}; // userid, socket
    const socketUserIdMap = {}

    const SEND_MESSAGE = 'send-message';
    const RECEIVE_MESSAGE = 'receive-message';
    const USER_REGISTER = 'user-register';
    const DISCONNECT = "disconnect";

    const userConnectedToServerEvent = 'user-connected-to-server';

    io.on('connection', function (socket) {
        console.log(`Connected successfully ${socket.id}`);

        socket.on(USER_REGISTER, function (userId) {
            if (socketUserIdMap[socket.id] !== undefined) {
                const userId = socketUserIdMap[socket.id];
                delete socketUserIdMap[socket.id];
                delete userIdSocketMap[userId];
            }

            if (userIdSocketMap[userId] === undefined) {
                userIdSocketMap[userId] = socket.id;
                socketUserIdMap[socket.id] = userId;
                console.log(userId, "started listenting", "at socket id", socket.id);
            }
        });

        socket.on(DISCONNECT, function () {
            console.log(`Disconnected successfully`, socket.id);
            const userId = socketUserIdMap[socket.id];
            delete socketUserIdMap[socket.id];
            delete userIdSocketMap[userId];
        });

        socket.on(SEND_MESSAGE, async function (data) {
            console.log(`received message:`, data);
            // socket.broadcast.emit(RECEIVE_MESSAGE, data);
            const senderId = data.sender_id;
            await messageController.insertMessage(data);
            //onlineUsersScoketMap[senderId] = socket.id;
            if (data.receiver_id !== undefined) {
                const receiverSocketId = userIdSocketMap[data.receiver_id];
                console.log("receiver", data.receiver_id, receiverSocketId);
                if (receiverSocketId !== undefined)
                    io.to(receiverSocketId).emit(RECEIVE_MESSAGE, data); //https://socket.io/docs/v3/emit-cheatsheet/
            }

        });
    });
}