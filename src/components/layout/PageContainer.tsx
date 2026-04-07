import React from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  narrow?: boolean;
}

export function PageContainer({ children, className, narrow = false, ...props }: PageContainerProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-4 md:px-6 py-8 flex-1",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
