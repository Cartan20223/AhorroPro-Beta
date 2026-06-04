import * as React from "react";
import { cn } from "./utils";

function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-xl bg-[#f0f0f5]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
