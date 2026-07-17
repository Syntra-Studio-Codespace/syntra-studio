import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";
type ButtonSize = "small" | "medium" | "large";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-brand-cyan bg-brand-cyan text-brand-charcoal shadow-[0_0_28px_rgba(34,211,238,0.2)] hover:shadow-[0_0_36px_rgba(34,211,238,0.28)]",
  secondary:
    "border-current bg-transparent text-current hover:border-brand-cyan hover:bg-brand-cyan/10 hover:text-brand-cyan",
  ghost: "border-transparent bg-transparent text-current hover:text-brand-cyan",
  dark: "border-brand-charcoal bg-brand-charcoal text-brand-offwhite hover:bg-brand-indigo",
};

const sizeClasses: Record<ButtonSize, string> = {
  small: "min-h-9 px-4 text-sm",
  medium: "min-h-11 px-5 text-sm",
  large: "min-h-[3.25rem] px-6 text-base",
};

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "medium",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full border font-heading font-semibold transition-[background,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.98]",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <Link className={classes} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
