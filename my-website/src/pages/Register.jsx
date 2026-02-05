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

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    setMsg("");

    if (!name.trim() || !email.trim() || !pw1 || !pw2) {
      setMsg("Please fill in all fields.");
      return;
    }
    if (pw1.length < 6) {
      setMsg("Password must be at least 6 characters.");
      return;
    }
    if (pw1 !== pw2) {
      setMsg("Passwords do not match.");
      return;
    }

    // Demo: auto-login after register
    login({ token: "demo-token", role: "user" });
    nav("/", { replace: true });
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-7">
        <h1 className="text-2xl font-bold text-emerald-300">Create account</h1>
        <p className="mt-2 text-sm text-zinc-400">Register to save your library settings.</p>

        {msg ? (
          <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-200">
            {msg}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <Field label="Name">
            <input
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400/60"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </Field>

          <Field label="Email">
            <input
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </Field>

          <Field label="Password">
            <input
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400/60"
              type="password"
              value={pw1}
              onChange={(e) => setPw1(e.target.value)}
              placeholder="Min 6 characters"
              autoComplete="new-password"
            />
          </Field>

          <Field label="Confirm password">
            <input
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400/60"
              type="password"
              value={pw2}
              onChange={(e) => setPw2(e.target.value)}
              placeholder="Repeat password"
              autoComplete="new-password"
            />
          </Field>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-400 px-4 py-2 font-semibold text-zinc-950 hover:opacity-90 active:opacity-80"
          >
            Create account
          </button>

          <p className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link className="font-semibold text-emerald-300 hover:underline" to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
