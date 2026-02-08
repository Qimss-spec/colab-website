function cx(...c) {
  return c.filter(Boolean).join(" ");
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary | secondary | ghost | danger
  size = "md", // sm | md | lg
  disabled = false,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold transition active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60";

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const variants = {
    primary: "bg-emerald-400 text-zinc-950 hover:opacity-90",
    secondary: "border border-zinc-800 bg-zinc-950 text-zinc-100 hover:bg-zinc-900/60 hover:border-zinc-700",
    ghost: "text-zinc-100 hover:bg-zinc-900/60",
    danger: "border border-rose-500/30 bg-rose-500/10 text-rose-200 hover:opacity-90",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(base, sizes[size] || sizes.md, variants[variant] || variants.primary, className)}
    >
      {children}
    </button>
  );
}
