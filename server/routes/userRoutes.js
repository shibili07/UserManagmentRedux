import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, admin, getUsers)
  .post(protect, admin, createUser);

router.route("/:id")
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
