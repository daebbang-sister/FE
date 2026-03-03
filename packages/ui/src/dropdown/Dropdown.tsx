"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cva, VariantProps } from "class-variance-authority";
import { useState } from "react";
import { cn } from "../lib/utils";

type DropdownOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type DropdownProps = VariantProps<typeof dropDownVariants> & {
  name?: string;
  options: DropdownOption[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const dropDownVariants = cva(
  "flex w-full items-center justify-between border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary box-border bg-neutral-0",
  {
    variants: {
      status: {
        default: "border-neutral-300",
        disabled:
          "bg-neutral-200 border-neutral-300 text-text-disabled cursor-not-allowed",
      },
      size: {
        M: "px-3 py-1.5 caption1",
        L: "px-3.5 py-4 body1",
      },
    },
    defaultVariants: {
      status: "default",
      size: "L",
    },
  }
);

const dropDownItemVariants = cva(
  `
  w-full transition-colors
  text-text-disabled
  data-focus:text-text-primary
  data-disabled:text-text-disabled
  data-disabled:bg-neutral-200
  data-disabled:cursor-not-allowed
  `,
  {
    variants: {
      size: {
        M: "py-3 caption1 text-center",
        L: "px-3.5 py-4 body1 text-left",
      },
    },
    defaultVariants: {
      size: "L",
    },
  }
);

export function Dropdown({
  status,
  size,
  name,
  options,
  defaultValue,
  placeholder = "선택해주세요.",
  className,
  disabled = false,
}: DropdownProps) {
  const isDisabled = disabled || status === "disabled";
  const [selected, setSelected] = useState(defaultValue ?? "");

  return (
    <div className="w-full">
      {name ? <input type="hidden" name={name} value={selected} /> : null}

      <Menu as="div" className="relative w-full">
        <MenuButton
          disabled={isDisabled}
          className={cn(
            dropDownVariants({
              status: isDisabled ? "disabled" : status,
              size,
            }),
            className
          )}
        >
          <span className={cn(!selected && "text-text-disabled")}>
            {selected || placeholder}
          </span>
          <ChevronDownIcon
            className={cn(
              "size-6 stroke-[1.5]",
              isDisabled
                ? "stroke-text-disabled"
                : selected
                  ? "stroke-text-disabled"
                  : "stroke-text-primary"
            )}
          />
        </MenuButton>

        {!isDisabled && (
          <MenuItems className="absolute left-0 top-full z-2 w-full bg-neutral-0 shadow-[0_2px_4px_rgba(0,0,0,0.08)] outline-none">
            {options.map((option) => {
              const isSelected = selected === option.value;

              return (
                <MenuItem
                  key={option.value}
                  as="button"
                  type="button"
                  disabled={option.disabled}
                  onClick={() => setSelected(option.value)}
                  className={cn(
                    dropDownItemVariants({ size }),
                    isSelected && "text-text-primary cursor-not-allowed"
                  )}
                >
                  {option.label}
                </MenuItem>
              );
            })}
          </MenuItems>
        )}
      </Menu>
    </div>
  );
}
