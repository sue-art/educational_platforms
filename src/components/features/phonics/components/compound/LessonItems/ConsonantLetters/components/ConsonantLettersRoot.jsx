import React from "react";
import { cn } from "@/lib/utils";

export const ConsonantLettersRoot = ({ children, className, ...props }) => {
  return (
    <div className={cn("mt-8", className)} {...props}>
      {children}
    </div>
  );
};
