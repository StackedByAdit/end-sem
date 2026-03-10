import type { Request, Response } from "express";
import { prisma } from "../../db";
// Users/Adity/OneDrive/Desktop/CODE/end-sem/end-sem/backend/src
export async function getBlogs(req: Request, res: Response) {

  const blogs = await prisma.blogs.findMany({
    include: {
      user: {
        select: {
          email: true
        }
      }
    }
  });

  res.json({
    blogs
  });
}

export async function getBlogById(req: Request, res: Response) {

  const id = Number(req.params.id);

  const blog = await prisma.blogs.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          email: true
        }
      }
    }
  });

  if (!blog) {
    return res.status(404).json({
      message: "Blog was not found"
    });
  }

  res.json({
    blog
  });
}
