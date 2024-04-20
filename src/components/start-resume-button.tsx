"use client"

export const StartResumeButton = ({ startResume }: { startResume: () => Promise<void> }) => {
  return (
    <button onClick={() => startResume()} type="button">
      Start/Resume
    </button>
  )
}
