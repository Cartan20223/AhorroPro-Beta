"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "./utils";

interface ProgressProps extends React.ComponentProps<"div"> {
  value: number;
  indicatorClassName?: string;
}

function Progress({
  className,
  value,
  indicatorClassName,
  ...props
}: ProgressProps) {
  return (
    <div
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-[#f0f0f5]",
        className,
      )}
      {...props}
    >
      <motion.div
        data-slot="progress-indicator"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(value, 100)}%` }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn("h-full rounded-full bg-accent-500", indicatorClassName)}
      />
    </div>
  );
}

export { Progress };
