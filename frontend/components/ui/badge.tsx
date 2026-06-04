import * as React from "react";
import { cn } from "./utils";

type BadgeVariant = "default" | "secondary" | "outline" | "accent";

interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-[#0a0a0f] text-white",
  secondary: "bg-[#f5f5f8] text-[#6b6b80]",
  outline: "border border-[rgba(0,0,0,0.08)] text-[#0a0a0f]",
  accent: "bg-accent-50 text-accent-700",
};

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
export type { BadgeProps, BadgeVariant };
