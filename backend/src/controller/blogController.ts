import type { Request, Response } from "express";
import { prisma } from "../../db";
import type { AuthRequest } from "../authMiddleware";
import { createBlogSchema } from "../utils/type";

export async function getBlogs(_req: Request, res: Response) {
  const blogs = await prisma.blogs.findMany({
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.json({ blogs });
}

export async function getBlogById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const blog = await prisma.blogs.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  if (!blog) {
    return res.status(404).json({ message: "Blog was not found" });
  }

  return res.json({ blog });
}

export async function createBlog(req: AuthRequest, res: Response) {
  const parsed = createBlogSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: parsed.error.message });
  }

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { title, content, imageURL } = parsed.data;

  const blog = await prisma.blogs.create({
    data: {
      title,
      content,
      imageUrl: imageURL,
      userId: req.userId,
      author: String(req.userId),
    },
  });

  return res.status(201).json({ message: "Blog created", blog });
}
