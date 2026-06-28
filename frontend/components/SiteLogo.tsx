import Image from "next/image";
import { SITE_LOGO, SITE_NAME } from "@/lib/site";

type SiteLogoProps = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export default function SiteLogo({
  className = "h-12 w-auto",
  width = 90,
  height = 120,
  priority = false,
}: SiteLogoProps) {
  return (
    <Image
      src={SITE_LOGO}
      alt={SITE_NAME}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
