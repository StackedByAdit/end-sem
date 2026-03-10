import express from "express";
import { register, login } from "../controller/authController";

const app = express();

app.use(express.json());

app.post("/signup", register);
app.post("/login", login);

export default app;