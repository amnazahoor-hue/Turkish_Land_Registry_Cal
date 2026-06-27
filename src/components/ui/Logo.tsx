import Image from "next/image";
import { cn } from "@/lib/cn";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  compact?: boolean;
  mobile?: boolean;
}

export default function Logo({
  className,
  compact = false,
  mobile = false,
}: LogoProps) {
  const iconOnly = compact && !mobile;
  const showText = !compact || mobile;

  return (
    <div className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      <Image
        src="/images/logo.webp"
        alt="Tapu Harcı Hesaplama"
        width={482}
        height={512}
        priority
        className={cn(
          "w-auto shrink-0 object-contain",
          iconOnly ? "h-9" : mobile ? "h-9 sm:h-10" : "h-11 sm:h-12"
        )}
      />

      {showText && (
        <span
          className={cn(
            "min-w-0 truncate font-display font-bold leading-tight tracking-tight text-white",
            mobile ? "text-base sm:text-lg" : "text-lg sm:text-xl"
          )}
        >
          Tapu Harcı{" "}
          <span className="text-accent">Hesaplama</span>
        </span>
      )}
    </div>
  );
}
