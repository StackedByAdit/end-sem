import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/axios-instance";

export function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setLoading(true);
    setError("");

    try {
      await apiClient.post("/auth/signup", { name, email, password });
      navigate("/signin");
    } catch {
      setError("Signup failed. Try a different email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto mt-10 max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Sign up</h1>

      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        className="w-full rounded border p-2"
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full rounded border p-2"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full rounded border p-2"
      />

      <button
        type="button"
        onClick={onSubmit}
        disabled={loading}
        className="cursor-pointer rounded bg-black px-4 py-2 text-white disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create account"}
      </button>

      <p>
        Already have an account? <Link to="/signin" className="underline">Sign in</Link>
      </p>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </section>
  );
}
