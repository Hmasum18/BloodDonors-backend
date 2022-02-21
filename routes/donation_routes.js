import Router from "express-promise-router";
import DonationController from "../controller/donation_controller.js";
import {authenticateToken} from "../middleware/authorization.js";

const donationController = new DonationController()
const router = Router();

router.post('/', authenticateToken, donationController.create)
// router.get('/:post_id', authenticateToken, donationController.getAllComment);

export default router;