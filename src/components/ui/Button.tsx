import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-accent",
  secondary: "bg-surface text-ink border hairline hover:border-ink",
  ghost: "text-ink underline-offset-4 hover:underline px-0",
};

export function Button({
  href, children, variant = "primary", className, icon = true, download,
}: { href: string; children: React.ReactNode; variant?: Variant; className?: string; icon?: boolean; download?: boolean }) {
  const cls = cn(
    "group inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
    styles[variant],
    className,
  );
  const inner = (
    <>
      <span>{children}</span>
      {icon && <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </>
  );
  if (isExternal(href) || download) {
    return (
      <a href={href} className={cls} {...(download ? { download: true } : { target: href.startsWith("mailto:") ? undefined : "_blank", rel: "noopener noreferrer" })}>
        {inner}
      </a>
    );
  }
  return <Link href={href} className={cls}>{inner}</Link>;
}
