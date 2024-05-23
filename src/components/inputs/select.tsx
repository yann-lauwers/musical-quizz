"use client";

import clsx from "clsx";
import { ComponentPropsWithoutRef, FC } from "react";

export const Select: FC<
  ComponentPropsWithoutRef<"select"> & {
    options: { id: string; label: string }[];
  }
> = ({ options, className, ...props }) => {
  return (
    <select
      className={clsx(
        "w-full rounded-lg bg-[#1c1c1c] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white md:w-60",
        className,
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
