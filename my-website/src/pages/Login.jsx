import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm font-semibold text-zinc-200">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setMsg("");

    const em = email.trim().toLowerCase();
    if (!em || !password) {
      setMsg("Please enter email and password.");
      return;
    }

    // DEMO role rule:
    const role = em.startsWith("admin") ? "admin" : "user";
    login({ token: "demo-token", role });

    nav(role === "admin" ? "/admin" : "/", { replace: true });
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-7">
        <h1 className="text-2xl font-bold text-emerald-300">Sign in</h1>
        <p className="mt-2 text-sm text-zinc-400">Access your library and admin tools.</p>

        {msg ? (
          <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
            {msg}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <Field label="Email">
            <input
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </Field>

          <Field label="Password">
            <input
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400/60"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </Field>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-400 px-4 py-2 font-semibold text-zinc-950 hover:opacity-90 active:opacity-80"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-zinc-400">
            Don’t have an account?{" "}
            <Link className="font-semibold text-emerald-300 hover:underline" to="/register">
              Create one
            </Link>
          </p>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-400">
            Demo tip: use email starting with <span className="text-zinc-200 font-semibold">admin</span> to enter Admin.
          </div>
        </form>
      </div>
    </div>
  );
}
