import Router from "express-promise-router";
import bloodPostRouter from "./blood_post_routes.js";
import donationPostRouter from "./donation_post_routes.js";

const router = Router();

router.use("/blood-post", bloodPostRouter);
router.use("/donation-post", donationPostRouter);

export default router;