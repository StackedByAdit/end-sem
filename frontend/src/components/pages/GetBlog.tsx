import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiClient } from "@/lib/axios-instance";

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl?: string | null;
  user: {
    email: string;
    name?: string | null;
  };
}

export function GetBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id) return;
    apiClient
      .get<{ blog: Blog }>(`/blogs/${id}`)
      .then(response => setBlog(response.data.blog))
      .catch(() => setBlog(null));
  }, [id]);

  if (!blog) {
    return <main className="p-4">Blog not found.</main>;
  }

  return (
    <main className="mx-auto mt-8 max-w-2xl space-y-3 p-4">
      <Link to="/blogs" className="text-sm underline">
        ← Back to blogs
      </Link>
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-sm text-gray-600">By {blog.user.name ?? blog.user.email}</p>
      {blog.imageUrl ? (
        <img src={blog.imageUrl} alt={blog.title} className="max-h-96 w-full rounded object-cover" />
      ) : null}
      <p className="whitespace-pre-wrap">{blog.content}</p>
    </main>
  );
}
