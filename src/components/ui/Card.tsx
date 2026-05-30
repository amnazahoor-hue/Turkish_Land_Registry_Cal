import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
}

export default function Card({ children, className, highlighted }: CardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-300",
        highlighted && "border-2 border-accent shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
