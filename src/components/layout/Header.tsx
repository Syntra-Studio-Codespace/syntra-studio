"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { primaryNavigation } from "@/data/navigation";
import { siteSettings } from "@/data/site-settings";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { CurrencySwitcher } from "@/components/currency/CurrencySwitcher";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        isScrolled || isMenuOpen
          ? "border-[color:var(--border-on-dark)] bg-[color:rgba(15,15,23,0.88)] shadow-[0_1px_0_rgba(247,247,251,0.04)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <Logo priority />

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {primaryNavigation.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative rounded-sm py-2 font-heading text-sm font-semibold text-[color:var(--text-on-dark-secondary)] transition-colors hover:text-brand-offwhite",
                  isActive && "text-brand-offwhite",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-brand-cyan opacity-0 transition-opacity",
                    "group-hover:opacity-100",
                    isActive && "opacity-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <CurrencySwitcher />
          <Button href={siteSettings.startProjectHref}>Start a Project</Button>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[color:var(--border-on-dark)] text-brand-offwhite transition hover:border-brand-cyan hover:text-brand-cyan lg:hidden"
          onClick={() => setIsMenuOpen((value) => !value)}
          ref={closeButtonRef}
          type="button"
        >
          {isMenuOpen ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
        </button>
      </div>

      <div
        aria-hidden={!isMenuOpen}
        className={cn(
          "fixed inset-x-0 top-20 z-30 h-[calc(100vh-5rem)] bg-brand-charcoal px-6 py-8 transition duration-300 lg:hidden",
          isMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
        )}
        id="mobile-navigation"
      >
        <nav aria-label="Mobile navigation" className="flex h-full flex-col">
          <div className="grid gap-2">
            {primaryNavigation.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex min-h-14 items-center justify-between border-b border-[color:var(--border-on-dark)] font-heading text-3xl font-semibold text-brand-offwhite transition-colors hover:text-brand-cyan",
                    isActive && "text-brand-cyan",
                  )}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto pt-8">
            <div className="mb-4">
              <CurrencySwitcher />
            </div>
            <Button className="w-full" href={siteSettings.startProjectHref} size="large">
              Start a Project
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
