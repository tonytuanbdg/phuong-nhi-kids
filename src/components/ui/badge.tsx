import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Tone = "primary" | "secondary" | "accent" | "mint" | "pink" | "muted";

const toneClasses: Record<Tone, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/20 text-accent-foreground",
  mint: "bg-mint/10 text-mint",
  pink: "bg-pink/10 text-pink",
  muted: "bg-muted text-muted-foreground",
};

export function Badge({
  tone = "muted",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
