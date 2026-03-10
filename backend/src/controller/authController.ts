import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../db";
import ENV from "../utils/config";
import { registerSchema, signinSchema } from "../utils/type";

const JWT_SECRET = process.env.JWT_SECRET

console.log(JWT_SECRET);

export const register = async (req: Request, res: Response) => {
    const { success, data, error } = registerSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: error.message });
    }
    const { email, password, name } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, name, password: hashedPassword },
    });

    return res.status(201).json({
        message: "Signup successful",
        user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt },
    });
};

export const login = async (req: Request, res: Response) => {
    const parsed = signinSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

    const { email, password, name } = parsed.data;

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) { res.status(401).json({ error: "Invalid credentials" }); return; }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) { res.status(401).json({ error: "Invalid Credentials" }); return; }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET!);

    return res.json({
        message: "Login Successful",
        token: token,
        userId: user.id
    });
};