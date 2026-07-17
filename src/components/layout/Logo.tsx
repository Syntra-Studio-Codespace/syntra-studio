import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type LogoProps = {
  variant?: "wordmark" | "mark";
  tone?: "light" | "gradient";
  className?: string;
  priority?: boolean;
};

const logoSource = {
  wordmark: "/brand/syntra-wordmark-white.png",
  markLight: "/brand/syntra-mark-white.png",
  markGradient: "/brand/syntra-mark-gradient.png",
};

export function Logo({
  variant = "wordmark",
  tone = "light",
  className,
  priority = false,
}: LogoProps) {
  const isWordmark = variant === "wordmark";
  const src = isWordmark
    ? logoSource.wordmark
    : tone === "gradient"
      ? logoSource.markGradient
      : logoSource.markLight;

  return (
    <Link
      aria-label="Syntra.studio home"
      className={cn("inline-flex items-center rounded-sm", className)}
      href="/"
    >
      <Image
        alt="Syntra.studio"
        className="h-auto w-auto object-contain"
        height={isWordmark ? 48 : 56}
        priority={priority}
        src={src}
        width={isWordmark ? 220 : 56}
      />
    </Link>
  );
}
