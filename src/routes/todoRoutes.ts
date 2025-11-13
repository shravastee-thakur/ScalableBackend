import express from "express";
import {
  createTodo,
  getTodos,
  editTodo,
  deleteTodo,
} from "../controllers/todoController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.route("/").post(protect, createTodo).get(protect, getTodos);
router.route("/:id").put(protect, editTodo).delete(protect, deleteTodo);

export default router;
