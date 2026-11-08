export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);
