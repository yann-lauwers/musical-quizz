"use client";

import { FC } from "react";

export const Select: FC<{
  options: { id: string; label: string }[];
  name: string;
  onChange: (e: any) => void;
}> = ({ name, options, onChange }) => {
  return (
    <select
      name={name}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg bg-[#1c1c1c] px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white md:w-60"
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
