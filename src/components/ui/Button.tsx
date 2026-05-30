"use client";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-btn text-white hover:bg-btn-hover shadow-lg shadow-btn/25 hover:shadow-btn/40 active:scale-[0.98]",
  secondary: "bg-secondary text-white hover:opacity-90 active:scale-[0.98]",
  ghost:
    "bg-transparent text-primary border-2 border-border hover:border-secondary hover:text-secondary",
};

export default function Button({
  variant = "primary",
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "gpu-accelerate inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span
            className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"
            aria-hidden
          />
          <span>Calculating...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
