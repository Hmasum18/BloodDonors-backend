import PromiseRouter from "express-promise-router";
import userRouter from "./user_routes.js" 
import authRouter from "./auth_routes.js"

const router = PromiseRouter();

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;

