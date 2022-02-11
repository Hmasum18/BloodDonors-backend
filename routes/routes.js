import PromiseRouter from "express-promise-router";
import userRouter from "./user_routes.js" 
import authRouter from "./auth_routes.js"
import postRouter from "./post_routes.js"
import commentRouter from "./comment_routes.js"

const router = PromiseRouter();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);

export default router;

