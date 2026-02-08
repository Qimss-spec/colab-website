import { useMemo, useState } from "react";
import GameCard from "../components/GameCard";
import SearchAndControls from "../components/SearchAndControls";

const GAMES = [
  {
    id: "PSP-301",
    title: "Nova Sprint",
    genre: "Racing",
    status: "Available",
    year: 2008,
    description: "Compact arcade racing with quick sessions and high score runs.",
  },
  {
    id: "PSP-302",
    title: "Blade Runner X",
    genre: "Action",
    status: "Available",
    year: 2009,
    description: "Combo-driven action with stylish combat and boss battles.",
  },
  {
    id: "PSP-303",
    title: "Rune Valley",
    genre: "RPG",
    status: "Coming Soon",
    year: 2011,
    description: "Story-driven RPG with crafting and exploration.",
  },
];

export default function Psp() {
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
        <h1 className="text-3xl font-bold text-emerald-300">PSP Library</h1>
        <p className="mt-2 text-zinc-300">
          Browse PSP games (demo). Clean layout, consistent cards, fast filtering.
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
