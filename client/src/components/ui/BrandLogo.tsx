import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";

type BrandLogoProps = {
  variant?: "wordmark" | "mark";
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  variant = "wordmark",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const src =
    variant === "mark" ? siteConfig.brand.logoMark : siteConfig.brand.logoWordmark;

  if (variant === "mark") {
    return (
      <Image
        src={src}
        alt={siteConfig.company.name}
        width={72}
        height={43}
        priority={priority}
        className={`h-7 w-auto object-contain sm:h-8 ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={siteConfig.company.name}
      width={220}
      height={44}
      priority={priority}
      className={`h-7 w-auto max-w-[170px] object-contain object-left sm:h-8 sm:max-w-[200px] lg:h-9 ${className}`}
    />
  );
}
