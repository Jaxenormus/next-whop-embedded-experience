import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className={cn("flex items-center justify-center w-full h-full")}>
      <Loader2 className="h-5 w-5 animate-spin" />
    </div>
  );
};
