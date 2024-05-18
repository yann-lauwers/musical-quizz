"use client";

import { startResumePlayback } from "@/actions/spotify";
import { useTransition } from "react";

export const StartResumeButton = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        startTransition(() => {
          startResumePlayback("87184c552c056d656bba57dc1ac9b0130a9f8134");
        });
      }}
      type="button"
    >
      Start/Resume
    </button>
  );
};
