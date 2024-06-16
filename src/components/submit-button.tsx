"use client";

import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

export const SubmitButton: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx("flex items-center gap-2", className)}
    >
      {children}
    </button>
  );
};
