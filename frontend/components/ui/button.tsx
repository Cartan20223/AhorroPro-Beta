import * as React from "react";
import { cn } from "./utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#111] text-white hover:opacity-85 active:scale-[0.97]",
  secondary:
    "bg-[#111] text-white hover:opacity-85 active:scale-[0.97]",
  outline:
    "border-2 border-[rgba(0,0,0,0.09)] text-gray-400 hover:text-gray-900 hover:border-gray-300",
  ghost:
    "text-gray-400 hover:text-gray-900 hover:bg-gray-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-black rounded-2xl transition-all",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "active:scale-[0.97]",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    />
  );
}

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
