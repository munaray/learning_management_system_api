import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/authenticate";
import {
  getAllNotifications,
  updateNotification,
} from "../controllers/notification.controller";
const router = express.Router();

router.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllNotifications,
);
router.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification,
);

export default router;
