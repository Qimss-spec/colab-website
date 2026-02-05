import { NavLink, useNavigate } from "react-router-dom";
import { getRole, isAuthed, logout as doLogout } from "../services/auth";
import { useEffect, useState } from "react";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

function useAuthSnapshot() {
  const [snap, setSnap] = useState({ authed: isAuthed(), role: getRole() });
  useEffect(() => {
    const tick = () => setSnap({ authed: isAuthed(), role: getRole() });
    window.addEventListener("focus", tick);
    window.addEventListener("storage", tick);
    const id = setInterval(tick, 800);
    return () => {
      window.removeEventListener("focus", tick);
      window.removeEventListener("storage", tick);
      clearInterval(id);
    };
  }, []);
  return snap;
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          "rounded-xl px-3 py-2 text-sm font-semibold transition",
          isActive
            ? "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-400/25"
            : "text-zinc-200 hover:bg-zinc-900/60 hover:text-zinc-100"
        )
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  const nav = useNavigate();
  const { authed, role } = useAuthSnapshot();
  const [open, setOpen] = useState(false);

  function logout() {
    doLogout();
    setOpen(false);
    nav("/login", { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-400/25">
            🎮
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-zinc-100">My Website</div>
            <div className="text-xs text-zinc-400">Emulators & Library</div>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/emulator">Emulators</NavItem>
          <NavItem to="/nintendo">Nintendo</NavItem>
          <NavItem to="/ps2">PS2</NavItem>
          <NavItem to="/ps3">PS3</NavItem>
          <NavItem to="/psp">PSP</NavItem>
          {authed && role === "admin" ? <NavItem to="/admin">Admin</NavItem> : null}
        </nav>

        {/* Right actions */}
        <div className="hidden items-center gap-2 md:flex">
          {!authed ? (
            <>
              <NavLink
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900/60"
              >
                Sign in
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90"
              >
                Create account
              </NavLink>
            </>
          ) : (
            <>
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300">
                Role: <span className="font-semibold text-zinc-100">{role}</span>
              </div>
              <button
                onClick={logout}
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900/60"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile button */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-200 hover:bg-zinc-900/60"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="border-t border-zinc-800/80 bg-zinc-950 md:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6">
            <div className="grid grid-cols-2 gap-2">
              <NavLink onClick={() => setOpen(false)} to="/" className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-semibold text-zinc-200">
                Home
              </NavLink>
              <NavLink onClick={() => setOpen(false)} to="/emulator" className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-semibold text-zinc-200">
                Emulators
              </NavLink>
              <NavLink onClick={() => setOpen(false)} to="/nintendo" className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-semibold text-zinc-200">
                Nintendo
              </NavLink>
              <NavLink onClick={() => setOpen(false)} to="/ps2" className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-semibold text-zinc-200">
                PS2
              </NavLink>
              <NavLink onClick={() => setOpen(false)} to="/ps3" className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-semibold text-zinc-200">
                PS3
              </NavLink>
              <NavLink onClick={() => setOpen(false)} to="/psp" className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-semibold text-zinc-200">
                PSP
              </NavLink>
            </div>

            {!authed ? (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <NavLink onClick={() => setOpen(false)} to="/login" className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-semibold text-zinc-200">
                  Sign in
                </NavLink>
                <NavLink onClick={() => setOpen(false)} to="/register" className="rounded-xl bg-emerald-400 px-3 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90">
                  Create account
                </NavLink>
              </div>
            ) : (
              <button
                onClick={logout}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900/60"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
