import Router from "express-promise-router";
import bloodPostRouter from "./blood_post_routes.js";

const router = Router();

router.use("/blood-post", bloodPostRouter);

export default router;