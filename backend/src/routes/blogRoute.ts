import express from "express";
import { getBlogs, getBlogById } from "../controller/blogController";
import { register, login } from "../controller/authController";
import { authMiddleware } from "../authMiddleware";
import { resolve } from "bun";

const app = express();

app.use(express.json());

app.post("/signup", register);
app.post("/login", login);
app.get("/blogs", getBlogs);
app.get("/blogs/:id", getBlogById);
app.post("/blogs", authMiddleware);

export default app;