import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hero";
  showDot?: boolean;
}

export default function Badge({
  children,
  className,
  variant = "default",
  showDot = true,
}: BadgeProps) {
  const isHero = variant === "hero";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium",
        isHero
          ? "border border-white/20 bg-white/10 text-white backdrop-blur-sm"
          : "font-semibold text-primary",
        className
      )}
    >
      {showDot && (
        <span
          className={cn(
            "h-2 w-2 shrink-0 rounded-full",
            isHero ? "bg-accent" : "bg-btn"
          )}
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}
