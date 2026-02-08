import Button from "./Button";

function cx(...c) {
  return c.filter(Boolean).join(" ");
}

function Badge({ tone = "neutral", children }) {
  const map = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    warn: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    danger: "border-rose-500/30 bg-rose-500/10 text-rose-300",
    neutral: "border-zinc-700 bg-zinc-900 text-zinc-200",
    info: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", map[tone] || map.neutral)}>
      {children}
    </span>
  );
}

export default function GameCard({
  game,
  onOpen,
  onDetails,
  className = "",
}) {
  const g = game || {};
  const status = g.status || "Available";

  const tone =
    status === "Available" ? "success" :
    status === "Published" ? "success" :
    status === "Draft" ? "warn" :
    status === "Coming Soon" ? "warn" :
    status === "Archived" ? "danger" : "neutral";

  return (
    <div
      className={cx(
        "group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/35 transition hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900/50",
        className
      )}
    >
      {/* Cover */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
        {g.imageUrl ? (
          <img
            src={g.imageUrl}
            alt={g.title || "Game cover"}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/20">
                🎮
              </div>
              <p className="mt-3 text-xs text-zinc-500">No cover</p>
            </div>
          </div>
        )}

        <div className="absolute left-3 top-3">
          <Badge tone={tone}>{status}</Badge>
        </div>

        {/* subtle gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-zinc-100">
              {g.title || "Untitled Game"}
            </h3>
            <p className="mt-1 text-sm text-zinc-400">
              {(g.genre || "Genre")} • {g.year || "—"} {g.id ? `• ${g.id}` : ""}
            </p>
          </div>
        </div>

        {g.description ? (
          <p className="mt-3 line-clamp-2 text-sm text-zinc-400">{g.description}</p>
        ) : null}

        {/* Actions */}
        <div className="mt-5 flex gap-2">
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => (onOpen ? onOpen(g) : alert(`Open ${g.title || "game"} (demo)`))}
          >
            Open
          </Button>
          <Button
            variant="secondary"
            onClick={() => (onDetails ? onDetails(g) : alert(`Details for ${g.title || "game"} (demo)`))}
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}
