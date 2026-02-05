import { useMemo, useState } from "react";

const NAV_ITEMS = [
  { key: "overview", label: "Overview" },
  { key: "games", label: "Games" },
  { key: "platforms", label: "Platforms" },
  { key: "users", label: "Users" },
  { key: "settings", label: "Settings" },
];

const MOCK_GAMES = [
  { id: "G-1001", title: "Shadow Horizon", platform: "PS2", status: "Published", updatedAt: "2026-02-01", downloads: 18420, rating: 4.6 },
  { id: "G-1002", title: "Neon Drift", platform: "PSP", status: "Draft", updatedAt: "2026-01-29", downloads: 2320, rating: 4.1 },
  { id: "G-1003", title: "Crystal Quest", platform: "Nintendo", status: "Published", updatedAt: "2026-01-25", downloads: 9912, rating: 4.8 },
  { id: "G-1004", title: "Steel Arena", platform: "PS3", status: "Archived", updatedAt: "2025-12-18", downloads: 120, rating: 3.9 },
  { id: "G-1005", title: "Aurora Runner", platform: "PS2", status: "Published", updatedAt: "2026-02-03", downloads: 7401, rating: 4.3 },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function formatNumber(n) {
  try {
    return new Intl.NumberFormat().format(n);
  } catch {
    return String(n);
  }
}

function Badge({ tone = "neutral", children }) {
  const tones = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    warn: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    danger: "border-rose-500/30 bg-rose-500/10 text-rose-300",
    neutral: "border-zinc-700 bg-zinc-900 text-zinc-200",
    info: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  };
  return (
    <span className={cx("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", tones[tone] || tones.neutral)}>
      {children}
    </span>
  );
}

function IconButton({ children, onClick, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900 active:scale-[0.99]"
    >
      {children}
    </button>
  );
}

function PrimaryButton({ children, onClick, type = "button", disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2 font-semibold text-zinc-950 hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-60",
      )}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 font-semibold text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900 active:opacity-90"
    >
      {children}
    </button>
  );
}

function Input({ value, onChange, placeholder, className = "" }) {
  return (
    <input
      className={cx(
        "w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400/60",
        className
      )}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

function Select({ value, onChange, children, className = "" }) {
  return (
    <select
      className={cx(
        "w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400/60",
        className
      )}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
}

function Card({ title, subtitle, right, children }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40">
      <div className="flex items-start justify-between gap-4 border-b border-zinc-800 p-5">
        <div>
          <h3 className="text-base font-semibold text-zinc-100">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-zinc-400">{subtitle}</p> : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Modal({ open, title, subtitle, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-800 p-5">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
            {subtitle ? <p className="mt-1 text-sm text-zinc-400">{subtitle}</p> : null}
          </div>
          <IconButton label="Close modal" onClick={onClose}>
            ✕
          </IconButton>
        </div>
        <div className="p-5">{children}</div>
        {footer ? <div className="border-t border-zinc-800 p-5">{footer}</div> : null}
      </div>
    </div>
  );
}

function KPI({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-zinc-100">{value}</p>
      {hint ? <p className="mt-2 text-sm text-zinc-500">{hint}</p> : null}
    </div>
  );
}

export default function Admin() {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [globalSearch, setGlobalSearch] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  // Games state
  const [games, setGames] = useState(MOCK_GAMES);
  const [gameSearch, setGameSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [addOpen, setAddOpen] = useState(false);

  // Add form state
  const [newTitle, setNewTitle] = useState("");
  const [newPlatform, setNewPlatform] = useState("PS2");
  const [newStatus, setNewStatus] = useState("Draft");

  const platforms = useMemo(() => {
    const set = new Set(games.map((g) => g.platform));
    return ["All", ...Array.from(set)];
  }, [games]);

  const statuses = ["All", "Draft", "Published", "Archived"];

  const filteredGames = useMemo(() => {
    const q = gameSearch.trim().toLowerCase();
    return games
      .filter((g) => (platformFilter === "All" ? true : g.platform === platformFilter))
      .filter((g) => (statusFilter === "All" ? true : g.status === statusFilter))
      .filter((g) => {
        if (!q) return true;
        return (
          g.title.toLowerCase().includes(q) ||
          g.id.toLowerCase().includes(q) ||
          g.platform.toLowerCase().includes(q) ||
          g.status.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  }, [games, gameSearch, platformFilter, statusFilter]);

  const totals = useMemo(() => {
    const totalGames = games.length;
    const published = games.filter((g) => g.status === "Published").length;
    const downloads = games.reduce((sum, g) => sum + (g.downloads || 0), 0);
    const avgRating =
      games.length > 0
        ? (games.reduce((sum, g) => sum + (g.rating || 0), 0) / games.length).toFixed(2)
        : "0.00";
    return { totalGames, published, downloads, avgRating };
  }, [games]);

  function statusTone(s) {
    if (s === "Published") return "success";
    if (s === "Draft") return "warn";
    if (s === "Archived") return "danger";
    return "neutral";
  }

  function handleAddGame(e) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) {
      setStatusMsg("Please enter a game title.");
      return;
    }

    const now = new Date();
    const yyyy = String(now.getFullYear());
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");

    const newGame = {
      id: `G-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      platform: newPlatform,
      status: newStatus,
      updatedAt: `${yyyy}-${mm}-${dd}`,
      downloads: 0,
      rating: 0,
    };

    setGames((prev) => [newGame, ...prev]);
    setNewTitle("");
    setNewPlatform("PS2");
    setNewStatus("Draft");
    setAddOpen(false);
    setStatusMsg(`Added "${title}" successfully.`);
    setActive("games");
  }

  function handleQuickAction(action) {
    setStatusMsg(`${action} action clicked (wire this to your API later).`);
  }

  return (
    <div className="min-h-[calc(100vh-0px)] bg-zinc-950 text-zinc-100">
      <div className="flex">
        {/* SIDEBAR */}
        <aside
          className={cx(
            "fixed inset-y-0 left-0 z-40 w-72 border-r border-zinc-800 bg-zinc-950/95 backdrop-blur sm:static sm:block",
            sidebarOpen ? "block" : "hidden"
          )}
        >
          <div className="flex items-center justify-between border-b border-zinc-800 p-5">
            <div>
              <p className="text-xs font-semibold text-zinc-400">ADMIN</p>
              <p className="text-lg font-bold text-emerald-300">Control Center</p>
            </div>
            <div className="sm:hidden">
              <IconButton label="Close sidebar" onClick={() => setSidebarOpen(false)}>
                ✕
              </IconButton>
            </div>
          </div>

          <nav className="p-3">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActive(item.key);
                    setSidebarOpen(false);
                  }}
                  className={cx(
                    "mb-1 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition",
                    isActive
                      ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                      : "border border-transparent text-zinc-200 hover:border-zinc-800 hover:bg-zinc-900/60"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive ? <span className="text-xs text-emerald-300">•</span> : null}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-zinc-800 p-5">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
              <p className="text-sm font-semibold text-zinc-100">System Status</p>
              <p className="mt-1 text-sm text-zinc-400">All services operational</p>
              <div className="mt-3">
                <Badge tone="success">Online</Badge>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="min-h-screen w-full">
          {/* TOP BAR */}
          <header className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/85 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6">
              <div className="sm:hidden">
                <IconButton label="Open sidebar" onClick={() => setSidebarOpen(true)}>
                  ☰
                </IconButton>
              </div>

              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="min-w-0">
                  <h1 className="truncate text-lg font-bold text-zinc-100">
                    {active === "overview" ? "Overview" : NAV_ITEMS.find((n) => n.key === active)?.label}
                  </h1>
                  <p className="text-sm text-zinc-400">Manage content, platforms, and users.</p>
                </div>
              </div>

              <div className="hidden w-[380px] sm:block">
                <Input
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  placeholder="Global search (UI only)…"
                />
              </div>

              <div className="flex items-center gap-2">
                <IconButton label="Notifications" onClick={() => setStatusMsg("Notifications clicked (demo).")}>
                  🔔
                </IconButton>
                <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-2">
                  <div className="h-8 w-8 rounded-xl bg-zinc-800" />
                  <div className="hidden sm:block">
                    <p className="text-sm font-semibold leading-4">Admin</p>
                    <p className="text-xs text-zinc-400 leading-4">admin@local</p>
                  </div>
                </div>
              </div>
            </div>

            {/* STATUS BAR */}
            {statusMsg ? (
              <div className="border-t border-zinc-800">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-sm sm:px-6">
                  <p className="text-zinc-300">{statusMsg}</p>
                  <button
                    type="button"
                    className="rounded-lg px-2 py-1 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                    onClick={() => setStatusMsg("")}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ) : null}
          </header>

          <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
            {/* OVERVIEW */}
            {active === "overview" ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <KPI label="Total Games" value={formatNumber(totals.totalGames)} hint="Across all platforms" />
                  <KPI label="Published" value={formatNumber(totals.published)} hint="Visible to users" />
                  <KPI label="Total Downloads" value={formatNumber(totals.downloads)} hint="All-time (mock)" />
                  <KPI label="Avg Rating" value={totals.avgRating} hint="From user feedback (mock)" />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <Card
                    title="Quick Actions"
                    subtitle="Common tasks to manage your content"
                    right={
                      <PrimaryButton onClick={() => setAddOpen(true)}>
                        + Add Game
                      </PrimaryButton>
                    }
                  >
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => handleQuickAction("Bulk publish")}
                        className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-left hover:border-zinc-700 hover:bg-zinc-900"
                      >
                        <p className="font-semibold">Bulk publish</p>
                        <p className="mt-1 text-sm text-zinc-400">Publish multiple drafts at once</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickAction("Sync metadata")}
                        className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-left hover:border-zinc-700 hover:bg-zinc-900"
                      >
                        <p className="font-semibold">Sync metadata</p>
                        <p className="mt-1 text-sm text-zinc-400">Refresh titles, tags, and cover images</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActive("platforms");
                          setStatusMsg("Platforms opened (UI only).");
                        }}
                        className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-left hover:border-zinc-700 hover:bg-zinc-900"
                      >
                        <p className="font-semibold">Manage platforms</p>
                        <p className="mt-1 text-sm text-zinc-400">Edit emulator / platform configs</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActive("users");
                          setStatusMsg("Users opened (UI only).");
                        }}
                        className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-left hover:border-zinc-700 hover:bg-zinc-900"
                      >
                        <p className="font-semibold">User access</p>
                        <p className="mt-1 text-sm text-zinc-400">Roles, permissions, audit logs</p>
                      </button>
                    </div>
                  </Card>

                  <div className="lg:col-span-2">
                    <Card
                      title="Recent Updates"
                      subtitle="Latest items changed in the library"
                      right={
                        <SecondaryButton onClick={() => setActive("games")}>
                          View all
                        </SecondaryButton>
                      }
                    >
                      <div className="divide-y divide-zinc-800 rounded-2xl border border-zinc-800">
                        {games
                          .slice()
                          .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
                          .slice(0, 5)
                          .map((g) => (
                            <div key={g.id} className="flex items-center justify-between gap-3 p-4">
                              <div className="min-w-0">
                                <p className="truncate font-semibold text-zinc-100">{g.title}</p>
                                <p className="mt-1 text-sm text-zinc-400">
                                  {g.id} • {g.platform} • Updated {g.updatedAt}
                                </p>
                              </div>
                              <div className="shrink-0">
                                <Badge tone={statusTone(g.status)}>{g.status}</Badge>
                              </div>
                            </div>
                          ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </>
            ) : null}

            {/* GAMES */}
            {active === "games" ? (
              <Card
                title="Games Library"
                subtitle="Search, filter, and manage game entries"
                right={
                  <div className="flex items-center gap-2">
                    <SecondaryButton onClick={() => setStatusMsg("Export started (demo).")}>Export</SecondaryButton>
                    <PrimaryButton onClick={() => setAddOpen(true)}>+ Add Game</PrimaryButton>
                  </div>
                }
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                  <Input
                    value={gameSearch}
                    onChange={(e) => setGameSearch(e.target.value)}
                    placeholder="Search by title, id, platform…"
                    className="sm:col-span-2"
                  />
                  <Select value={platformFilter} onChange={(e) => setPlatformFilter(e.target.value)}>
                    {platforms.map((p) => (
                      <option key={p} value={p}>
                        Platform: {p}
                      </option>
                    ))}
                  </Select>
                  <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        Status: {s}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-800">
                  <div className="grid grid-cols-12 gap-3 border-b border-zinc-800 bg-zinc-900/40 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    <div className="col-span-4">Title</div>
                    <div className="col-span-2">Platform</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Updated</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>

                  {filteredGames.length === 0 ? (
                    <div className="p-6 text-sm text-zinc-400">No games match your filters.</div>
                  ) : (
                    <div className="divide-y divide-zinc-800">
                      {filteredGames.map((g) => (
                        <div key={g.id} className="grid grid-cols-12 items-center gap-3 px-4 py-4">
                          <div className="col-span-4 min-w-0">
                            <p className="truncate font-semibold text-zinc-100">{g.title}</p>
                            <p className="mt-1 text-sm text-zinc-500">
                              {g.id} • {formatNumber(g.downloads)} downloads • {g.rating ? `${g.rating}★` : "No rating"}
                            </p>
                          </div>
                          <div className="col-span-2 text-sm text-zinc-300">{g.platform}</div>
                          <div className="col-span-2">
                            <Badge tone={statusTone(g.status)}>{g.status}</Badge>
                          </div>
                          <div className="col-span-2 text-sm text-zinc-400">{g.updatedAt}</div>
                          <div className="col-span-2 flex justify-end gap-2">
                            <button
                              type="button"
                              className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm font-semibold text-zinc-200 hover:border-zinc-700 hover:bg-zinc-900"
                              onClick={() => setStatusMsg(`Edit "${g.title}" (demo).`)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-200 hover:opacity-90"
                              onClick={() => {
                                setGames((prev) => prev.filter((x) => x.id !== g.id));
                                setStatusMsg(`Deleted "${g.title}".`);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ) : null}

            {/* PLACEHOLDERS */}
            {active === "platforms" ? (
              <Card title="Platforms" subtitle="Configure consoles and emulator settings (UI placeholder)">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-sm text-zinc-400">
                  Add your platform configs here. Next step: connect to your backend / database.
                </div>
              </Card>
            ) : null}

            {active === "users" ? (
              <Card title="Users" subtitle="Manage roles and access (UI placeholder)">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-sm text-zinc-400">
                  Add user list, roles, and audit logs here.
                </div>
              </Card>
            ) : null}

            {active === "settings" ? (
              <Card title="Settings" subtitle="System settings (UI placeholder)">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <p className="font-semibold">Branding</p>
                    <p className="mt-1 text-sm text-zinc-400">Logo, name, and theme preferences.</p>
                    <div className="mt-4">
                      <SecondaryButton onClick={() => setStatusMsg("Branding opened (demo).")}>
                        Edit branding
                      </SecondaryButton>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <p className="font-semibold">Security</p>
                    <p className="mt-1 text-sm text-zinc-400">Password policy and session settings.</p>
                    <div className="mt-4">
                      <SecondaryButton onClick={() => setStatusMsg("Security opened (demo).")}>
                        Manage security
                      </SecondaryButton>
                    </div>
                  </div>
                </div>
              </Card>
            ) : null}
          </div>
        </main>
      </div>

      {/* ADD GAME MODAL */}
      <Modal
        open={addOpen}
        title="Add New Game"
        subtitle="Create a new entry in the library (frontend demo)"
        onClose={() => setAddOpen(false)}
        footer={
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <SecondaryButton onClick={() => setAddOpen(false)}>Cancel</SecondaryButton>
            <PrimaryButton type="submit" form="add-game-form">
              Create Game
            </PrimaryButton>
          </div>
        }
      >
        <form id="add-game-form" onSubmit={handleAddGame} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-zinc-200">Game title</label>
            <div className="mt-2">
              <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Metal Aurora"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-zinc-200">Platform</label>
              <div className="mt-2">
                <Select value={newPlatform} onChange={(e) => setNewPlatform(e.target.value)}>
                  <option value="Nintendo">Nintendo</option>
                  <option value="PS2">PS2</option>
                  <option value="PS3">PS3</option>
                  <option value="PSP">PSP</option>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-zinc-200">Status</label>
              <div className="mt-2">
                <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Archived">Archived</option>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 text-sm text-zinc-400">
            Tip: Next step is connecting this form to your backend (POST /games) and replacing mock data with API data.
          </div>
        </form>
      </Modal>
    </div>
  );
}
