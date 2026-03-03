"use client";

import { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

const tabVariants = cva("flex text-center", {
  variants: {
    variant: {
      active: "text-text-primary border-b border-b-text-primary",
      inactive: "text-text-disabled hover:text-text-primary",
    },
    size: {
      M: "p-4 body1",
      L: "p-5 title3",
    },
  },
  defaultVariants: {
    variant: "inactive",
  },
});

type TabButtonProps = {
  tabs: string[];
  size?: "M" | "L";
  defaultIndex?: number;
  className?: string;
  onChange?: (index: number) => void;
};

export function TabButton({
  tabs,
  size = "M",
  defaultIndex = 0,
  className,
  onChange,
}: TabButtonProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    onChange?.(index);
  };

  const containerClass = cn("flex", size === "L" ? "gap-4" : "gap-2");

  return (
    <div className={containerClass}>
      {tabs.map((tab, index) => (
        <button
          type="button"
          key={tab}
          className={cn(
            tabVariants({
              variant: index === selectedIndex ? "active" : "inactive",
              size,
            }),
            className
          )}
          onClick={() => handleClick(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
