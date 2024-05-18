"use client";

import { FC, PropsWithChildren } from "react";
import clsx from "clsx";

export const Button: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <button type="button" className={clsx("", className)}>
      {children}
    </button>
  );
};
