import { cn } from "@/lib/utils";

type Props = { className?: string; lockupClassName?: string; markClassName?: string };

/** Served from `public/brand/` — mark on small screens, full lockup from `md` up. */
export function BrandLogo({ className, lockupClassName, markClassName }: Props) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/asad-mark.svg"
        alt=""
        aria-hidden
        width={36}
        height={36}
        className={cn("size-9 shrink-0 md:hidden", markClassName)}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/asad-lockup.svg"
        alt="Asad Ullah — Design × Engineering"
        width={520}
        height={120}
        className={cn("hidden h-9 w-auto md:block", lockupClassName)}
      />
    </span>
  );
}
