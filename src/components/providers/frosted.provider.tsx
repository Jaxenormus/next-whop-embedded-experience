"use client";

import { TooltipProvider, Toaster } from "@whop/frosted-ui";
import type { ReactNode } from "react";

interface FrostedProviderProps {
  children: ReactNode;
}

export const FrostedProvider = (props: FrostedProviderProps) => {
  return (
    <TooltipProvider>
      <Toaster />
      {props.children}
    </TooltipProvider>
  );
};
