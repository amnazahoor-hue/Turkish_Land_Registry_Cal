import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  compact?: boolean;
  mobile?: boolean;
  /** Header / LCP logos only. Footer and below-fold uses explicit lazy loading. */
  priority?: boolean;
}

export default function Logo({
  className,
  compact = false,
  mobile = false,
  priority = false,
}: LogoProps) {
  const iconOnly = compact && !mobile;
  const showText = !compact || mobile;

  return (
    <div className={cn("flex items-center gap-1 sm:gap-1.5", className)}>
      <Image
        src="/images/logo-transparent.webp"
        alt="Tapu Harcı"
        title="Tapu Harcı — tapu harcı hesaplama logosu"
        width={482}
        height={512}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={cn(
          "w-auto shrink-0 object-contain",
          iconOnly ? "h-10" : mobile ? "h-10 sm:h-12" : "h-12 sm:h-14"
        )}
      />

      {showText && (
        <span
          className={cn(
            "min-w-0 truncate font-display font-bold leading-tight tracking-tight text-white",
            mobile ? "text-base sm:text-lg" : "text-lg sm:text-xl"
          )}
        >
          Tapu Harcı
        </span>
      )}
    </div>
  );
}
