"use client";

import clsx from "clsx";
import { ComponentPropsWithoutRef, FC } from "react";

export const Button: FC<ComponentPropsWithoutRef<"button">> = ({
  type,
  children,
  className,
  ...props
}) => {
  return (
    <button type={"button" ?? type} className={clsx("", className)} {...props}>
      {children}
    </button>
  );
};
