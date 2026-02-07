import { useMemo, useState } from "react";
import GameCard from "../components/GameCard";
import SearchAndControls from "../components/SearchAndControls";

const GAMES = [
  {
    id: "PS2-101",
    title: "Midnight Canyon",
    genre: "Racing",
    status: "Available",
    year: 2003,
    description: "Night racing with neon streets and drifting challenges.",
  },
  {
    id: "PS2-102",
    title: "Iron Kingdom",
    genre: "RPG",
    status: "Available",
    year: 2005,
    description: "Build your party, craft gear, and explore vast kingdoms.",
  },
  {
    id: "PS2-103",
    title: "Skyline Strike",
    genre: "Action",
    status: "Coming Soon",
    year: 2002,
    description: "Fast-paced combat and cinematic missions across the city.",
  },
];

export default function Ps2() {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("All");
  const [status, setStatus] = useState("All");

  const genres = useMemo(() => ["All", ...Array.from(new Set(GAMES.map((g) => g.genre)))], []);
  const statuses = ["All", "Available", "Coming Soon", "Archived"];

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return GAMES
      .filter((g) => (genre === "All" ? true : g.genre === genre))
      .filter((g) => (status === "All" ? true : g.status === status))
      .filter((g) => {
        if (!query) return true;
        return (
          g.title.toLowerCase().includes(query) ||
          g.id.toLowerCase().includes(query) ||
          (g.description || "").toLowerCase().includes(query)
        );
      });
  }, [q, genre, status]);

  return (
    <div className="space-y-6">
      <header className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-7">
        <h1 className="text-3xl font-bold text-emerald-300">PlayStation 2 Library</h1>
        <p className="mt-2 text-zinc-300">
          Browse PS2 games (demo). Connect this later to your API / database.
        </p>

        <div className="mt-5">
          <SearchAndControls
            searchValue={q}
            onSearchChange={setQ}
            searchPlaceholder="Search by title, id, description…"
            filters={[
              { label: "Genre", value: genre, onChange: setGenre, options: genres },
              { label: "Status", value: status, onChange: setStatus, options: statuses },
            ]}
          />
        </div>
      </header>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </section>
    </div>
  );
}
