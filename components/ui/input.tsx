import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-dark-light bg-dark-primary px-3 py-2 text-sm text-[#f0f9ff] shadow-sm shadow-black/5 transition-shadow placeholder:text-[#a0a0a0] focus-visible:border-[#06d6a0] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#06d6a0]/20 disabled:cursor-not-allowed disabled:opacity-50",
          type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" &&
            "p-0 pr-3 italic text-[#a0a0a0] file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-dark-light file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-[#f0f9ff]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

