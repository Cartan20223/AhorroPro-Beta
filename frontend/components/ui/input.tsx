import * as React from "react";
import { cn } from "./utils";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-2xl border-2 border-[rgba(0,0,0,0.09)] bg-[#fafafa] px-4 py-2 text-sm text-[#111]",
        "placeholder:text-gray-300",
        "focus:outline-none focus:border-[#111]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
