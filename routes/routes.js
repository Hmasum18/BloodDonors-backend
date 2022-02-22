import PromiseRouter from "express-promise-router";
import userRouter from "./user_routes.js" 
import authRouter from "./auth_routes.js"
import postRouter from "./post_routes.js"
import commentRouter from "./comment_routes.js"
import reactRouter from "./react_routes.js"
import messageRouter from "./message_routes.js"
import donationRouter from "./donation_routes.js"
import notificationRouter from "./notification_route.js"

const router = PromiseRouter();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/react", reactRouter);
router.use("/message", messageRouter);
router.use("/donation", donationRouter);
router.use("/notification", notificationRouter);

export default router;

