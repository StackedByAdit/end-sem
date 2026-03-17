import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/axios-instance";

export function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [error, setError] = useState("");

  async function handleCreate() {
    setError("");
    try {
      await apiClient.post("/blogs", { title, content, imageURL });
      navigate("/blogs");
    } catch {
      setError("Failed to create blog. Please login first.");
    }
  }

  return (
    <main className="mx-auto mt-8 max-w-2xl space-y-4 p-4">
      <h1 className="text-2xl font-bold">Create Blog</h1>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full rounded border p-2"
      />

      <input
        value={imageURL}
        onChange={e => setImageURL(e.target.value)}
        placeholder="Image URL (optional)"
        className="w-full rounded border p-2"
      />

      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your content"
        className="min-h-48 w-full rounded border p-2"
      />

      <button
        type="button"
        onClick={handleCreate}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Publish
      </button>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </main>
  );
}
