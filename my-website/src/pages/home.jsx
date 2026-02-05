import { Link } from "react-router-dom";

const PLATFORMS = [
  { title: "Nintendo", desc: "NES, SNES, GameBoy, and Switch emulators", to: "/nintendo" },
  { title: "PlayStation 2", desc: "PS2 emulator and game collection", to: "/ps2" },
  { title: "PlayStation 3", desc: "PS3 emulator and ISO library", to: "/ps3" },
  { title: "PlayStation Portable", desc: "PSP emulator and classic games", to: "/psp" },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.12),transparent_50%)]" />
        <div className="relative">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold text-zinc-100">Welcome</h1>
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-400/25">
              🎮
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-zinc-300">
            An emulator and game collection website. Choose your favorite platform and start playing.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/emulator"
              className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90"
            >
              Browse Emulators
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900/60"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PLATFORMS.map((p) => (
          <Link
            key={p.title}
            to={p.to}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 transition hover:-translate-y-0.5 hover:border-emerald-400/30 hover:bg-zinc-900/50"
          >
            <h2 className="text-lg font-semibold text-zinc-100 group-hover:text-emerald-200">{p.title}</h2>
            <p className="mt-2 text-sm text-zinc-400">{p.desc}</p>
            <div className="mt-4 text-sm font-semibold text-emerald-300">View →</div>
          </Link>
        ))}
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/20 p-6 text-sm text-zinc-400">
        ⚠️ This website is for educational and personal archive purposes only.
      </section>
    </div>
  );
}
