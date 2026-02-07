import Button from "./Button";

export default function SearchAndControls({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search…",

  filters = [], 
  // filters format:
  // [{ label: "Platform", value, onChange, options: ["All","PS2"] }]

  primaryActionLabel,
  onPrimaryAction,

  className = "",
}) {
  return (
    <div className={`grid grid-cols-1 gap-3 sm:grid-cols-12 ${className}`}>
      <input
        className="sm:col-span-6 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400/60"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        placeholder={searchPlaceholder}
      />

      <div className="sm:col-span-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filters.slice(0, 2).map((f) => (
          <select
            key={f.label}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 outline-none focus:border-emerald-400/60"
            value={f.value}
            onChange={(e) => f.onChange?.(e.target.value)}
          >
            {(f.options || []).map((opt) => (
              <option key={opt} value={opt}>
                {f.label}: {opt}
              </option>
            ))}
          </select>
        ))}
      </div>

      <div className="sm:col-span-2 flex items-stretch">
        {primaryActionLabel ? (
          <Button
            variant="primary"
            className="w-full"
            onClick={onPrimaryAction}
          >
            {primaryActionLabel}
          </Button>
        ) : (
          <div className="w-full" />
        )}
      </div>
    </div>
  );
}
