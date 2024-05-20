"use client";

import { ComponentPropsWithoutRef, FC, PropsWithChildren } from "react";
import clsx from "clsx";

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
