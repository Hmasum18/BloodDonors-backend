import DonationPostController from "../controller/donation_post_controller.js";
const donationPostController = new DonationPostController();
import Router from "express-promise-router";
import { authenticateToken } from "../middleware/authorization.js";
const router = Router();

router.post("/", authenticateToken, donationPostController.create);
// router.get("/:post_id", authenticateToken, bloodPostController.getBloodPostById);
// router.get("/", authenticateToken, bloodPostController.getAllBloodPost);

export default router;