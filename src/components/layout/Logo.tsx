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
      {isWordmark ? (
        <span className="relative block h-9 w-40 overflow-hidden sm:w-44">
          <Image
            alt="Syntra.studio"
            className="absolute max-w-none object-contain"
            height={2048}
            priority={priority}
            src={src}
            style={{
              height: "15.85rem",
              left: "-2.42rem",
              top: "-6.86rem",
              width: "15.85rem",
            }}
            width={2048}
          />
        </span>
      ) : (
        <Image
          alt="Syntra.studio"
          className="h-10 w-10 object-contain"
          height={56}
          priority={priority}
          src={src}
          width={56}
        />
      )}
    </Link>
  );
}
