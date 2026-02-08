function cx(...c) {
  return c.filter(Boolean).join(" ");
}

export default function LoadingSpinner({ label = "Loading…", size = "md", className = "" }) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-[3px]",
  };

  return (
    <div className={cx("flex items-center gap-3 text-sm text-zinc-400", className)}>
      <div
        className={cx(
          "animate-spin rounded-full border-zinc-700 border-t-emerald-400",
          sizes[size] || sizes.md
        )}
      />
      <span>{label}</span>
    </div>
  );
}
