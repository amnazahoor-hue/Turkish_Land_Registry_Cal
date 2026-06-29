import type { IconType } from "react-icons";
import {
  SiFacebook,
  SiInstagram,
  SiPinterest,
  SiQuora,
  SiReddit,
  SiX,
  SiYoutube,
} from "react-icons/si";
import type { SocialBrand } from "@/types";
import { cn } from "@/lib/cn";

type BrandStyle = {
  bg: string;
  hover: string;
  label: string;
  Icon: IconType;
  iconClass?: string;
};

const brandStyles: Record<SocialBrand, BrandStyle> = {
  facebook: {
    bg: "bg-[#1877F2]",
    hover: "hover:bg-[#166fe5]",
    label: "Facebook",
    Icon: SiFacebook,
  },
  instagram: {
    bg: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    hover: "hover:opacity-90",
    label: "Instagram",
    Icon: SiInstagram,
  },
  x: {
    bg: "bg-black",
    hover: "hover:bg-neutral-800",
    label: "X",
    Icon: SiX,
  },
  pinterest: {
    bg: "bg-[#E60023]",
    hover: "hover:bg-[#c5001f]",
    label: "Pinterest",
    Icon: SiPinterest,
  },
  reddit: {
    bg: "bg-[#FF4500]",
    hover: "hover:bg-[#e03d00]",
    label: "Reddit",
    Icon: SiReddit,
  },
  quora: {
    bg: "bg-[#B92B27]",
    hover: "hover:bg-[#a32622]",
    label: "Quora",
    Icon: SiQuora,
  },
  youtube: {
    bg: "bg-[#FF0000]",
    hover: "hover:bg-[#cc0000]",
    label: "YouTube",
    Icon: SiYoutube,
  },
};

interface SocialIconLinkProps {
  brand: SocialBrand;
  href: string;
  label: string;
}

export default function SocialIconLink({ brand, href, label }: SocialIconLinkProps) {
  const style = brandStyles[brand];
  const Icon = style.Icon;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label || style.label}
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-md transition-all duration-200 sm:h-10 sm:w-10",
        style.bg,
        style.hover,
        "hover:scale-105 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
      )}
    >
      <Icon
        className={cn(
          "h-[17px] w-[17px] shrink-0 text-white sm:h-[18px] sm:w-[18px]",
          style.iconClass
        )}
        aria-hidden
      />
    </a>
  );
}
