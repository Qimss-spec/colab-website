import { useMemo, useState } from "react";

const EMULATORS = [
  { id: "emu-001", name: "PCSX2", platform: "PS2", desc: "PlayStation 2 emulator for PC.", status: "Recommended", tags: ["ps2", "desktop"] },
  { id: "emu-002", name: "RPCS3", platform: "PS3", desc: "High-performance PlayStation 3 emulator.", status: "Recommended", tags: ["ps3", "desktop"] },
  { id: "emu-003", name: "PPSSPP", platform: "PSP", desc: "Fast and portable PSP emulator.", status: "Recommended", tags: ["psp", "desktop", "android"] },
  { id: "emu-004", name: "RetroArch", platform: "Nintendo", desc: "Multi-system frontend (cores required).", status: "Optional", tags: ["nintendo", "multi", "desktop"] },
];

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

function Badge({ tone = "neutral", children }) {
  const map = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    warn: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    neutral: "border-zinc-700 bg-zinc-900 text-zinc-200",
    info: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", map[tone] || map.neutral)}>
      {children}
    </span>
  );
}

function Card({ children }) {
  return <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">{children}</div>;
}

export default function Emulator() {
  const [q, setQ] = useState("");
  const [platform, setPlatform] = useState("All");

  const platforms = useMemo(() => {
    const set = new Set(EMULATORS.map((e) => e.platform));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return EMULATORS.filter((e) => (platform === "All" ? true : e.platform === platform)).filter((e) => {
      if (!query) return true;
      return (
        e.name.toLowerCase().includes(query) ||
        e.platform.toLowerCase().includes(query) ||
        e.desc.toLowerCase().includes(query) ||
        e.tags.join(" ").toLowerCase().includes(query)
      );
    });
  }, [q, platform]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-7">
        <h1 className="text-3xl font-bold text-emerald-300">Emulators</h1>
        <p className="mt-2 text-zinc-300">Browse emulator tools by platform (UI demo — connect to API later).</p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400/60 sm:col-span-2"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search emulators (name, platform, tags)…"
          />
          <select
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400/60"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            {platforms.map((p) => (
              <option key={p} value={p}>
                Platform: {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => (
          <Card key={e.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-zinc-100">{e.name}</h2>
                <p className="mt-1 text-sm text-zinc-400">{e.desc}</p>
              </div>
              <Badge tone={e.status === "Recommended" ? "success" : "neutral"}>{e.status}</Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge tone="info">{e.platform}</Badge>
              {e.tags.slice(0, 3).map((t) => (
                <span key={t} className="rounded-full border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-300">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-zinc-950 hover:opacity-90 active:opacity-80"
                onClick={() => alert(`Download link for ${e.name} (demo)`)}
              >
                Download
              </button>
              <button
                type="button"
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900"
                onClick={() => alert(`Details for ${e.name} (demo)`)}
              >
                Details
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
