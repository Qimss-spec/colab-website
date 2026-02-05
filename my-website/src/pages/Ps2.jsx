import { useMemo, useState } from "react";

const GAMES = [
  { id: "PS2-101", title: "Midnight Canyon", genre: "Racing", status: "Available", year: 2003 },
  { id: "PS2-102", title: "Iron Kingdom", genre: "RPG", status: "Available", year: 2005 },
  { id: "PS2-103", title: "Skyline Strike", genre: "Action", status: "Coming Soon", year: 2002 },
];

export default function Ps2() {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("All");

  const genres = useMemo(() => ["All", ...Array.from(new Set(GAMES.map((g) => g.genre)))], []);
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return GAMES.filter((g) => (genre === "All" ? true : g.genre === genre)).filter((g) => {
      if (!query) return true;
      return g.title.toLowerCase().includes(query) || g.id.toLowerCase().includes(query);
    });
  }, [q, genre]);

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-7">
        <h1 className="text-3xl font-bold text-emerald-300">PlayStation 2 Library</h1>
        <p className="mt-2 text-zinc-300">Search and manage PS2 games (demo data).</p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400/60 sm:col-span-2"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search games by title or id…"
          />
          <select
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400/60"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {genres.map((g) => (
              <option key={g} value={g}>Genre: {g}</option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((g) => (
          <div key={g.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold text-zinc-100">{g.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{g.genre} • {g.year} • {g.id}</p>
              </div>
              <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                g.status === "Available"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : "border-amber-500/30 bg-amber-500/10 text-amber-300"
              }`}>
                {g.status}
              </span>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90"
                onClick={() => alert(`Open ${g.title} (demo)`)}
              >
                Open
              </button>
              <button
                type="button"
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900"
                onClick={() => alert(`Details for ${g.title} (demo)`)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
