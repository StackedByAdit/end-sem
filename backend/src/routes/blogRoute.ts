import express from "express";
import { createBlog, getBlogById, getBlogs } from "../controller/blogController";
import { authMiddleware } from "../authMiddleware";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", authMiddleware, createBlog);

export default router;
