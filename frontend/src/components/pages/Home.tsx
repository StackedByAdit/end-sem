import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "@/lib/axios-instance";

interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  user: {
    email: string;
    name?: string | null;
  };
}

export function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    apiClient
      .get<{ blogs: Blog[] }>("/blogs")
      .then(response => setBlogs(response.data.blogs))
      .catch(() => setBlogs([]));
  }, []);

  return (
    <main className="mx-auto mt-8 max-w-3xl space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Link to="/blogs/create" className="rounded bg-black px-4 py-2 text-white">
          Create blog
        </Link>
      </div>

      {blogs.map(blog => (
        <Link key={blog.id} to={`/blogs/${blog.id}`} className="block rounded border p-4">
          <h2 className="text-lg font-semibold">{blog.title}</h2>
          <p className="text-sm text-gray-700">{blog.content}</p>
          <p className="mt-2 text-xs text-gray-500">By {blog.user.name ?? blog.user.email}</p>
        </Link>
      ))}

      {blogs.length === 0 ? <p>No blogs found.</p> : null}
    </main>
  );
}
