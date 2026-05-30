import { cn } from "@/lib/cn";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  compact?: boolean;
  mobile?: boolean;
}

export default function Logo({
  variant = "dark",
  className,
  compact = false,
  mobile = false,
}: LogoProps) {
  const isLight = variant === "light";
  const iconOnly = compact && !mobile;
  const showText = !compact || mobile;

  return (
    <div className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-xl shadow-md",
          iconOnly ? "h-9 w-9" : mobile ? "h-9 w-9 sm:h-10 sm:w-10" : "h-11 w-11",
          isLight
            ? "bg-gradient-to-br from-accent to-btn ring-2 ring-white/20"
            : "bg-gradient-to-br from-primary to-secondary ring-2 ring-accent/30"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className={cn(iconOnly || mobile ? "h-5 w-5" : "h-6 w-6")}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M4 20V10L12 4L20 10V20H15V14H9V20H4Z"
            fill={isLight ? "var(--color-primary)" : "white"}
          />
          <rect
            x="14"
            y="2"
            width="8"
            height="10"
            rx="1"
            fill="none"
            stroke={isLight ? "var(--color-primary)" : "white"}
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              "truncate font-display font-bold tracking-tight",
              mobile ? "text-lg" : "text-[1.35rem]",
              isLight ? "text-white" : "text-primary"
            )}
          >
            Tapu
            <span className={isLight ? "text-accent" : "text-btn"}>Calc</span>
          </span>
          {!mobile && (
            <span
              className={cn(
                "mt-1 text-[11px] font-medium uppercase tracking-[0.14em]",
                isLight ? "text-white/75" : "text-text-secondary"
              )}
            >
              Title Deed Fee Calculator
            </span>
          )}
        </div>
      )}
    </div>
  );
}
