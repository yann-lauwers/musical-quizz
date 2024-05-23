"use client";

import { Select } from "./inputs/select";
import { FC, useOptimistic, useTransition } from "react";
import { z } from "zod";
import { availableDevicesSchema } from "@/schemas/spotify";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const SelectDevices: FC<{
  devices: z.infer<typeof availableDevicesSchema> | null;
}> = ({ devices }) => {
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();
  const router = useRouter();

  const [_, startTransition] = useTransition();
  const [optimisticDeviceID, addOptimistic] = useOptimistic(
    currentSearchParams.get("device") ?? undefined,
    (currentDeviceId, newDeviceId) => {
      if (newDeviceId) {
        const parsedDeviceId = z.string().parse(newDeviceId);
        return parsedDeviceId;
      } else return currentDeviceId;
    },
  );

  const onChange = async (e: any) => {
    const deviceId = e.target.value;
    startTransition(() => addOptimistic(deviceId));

    const updatedSearchParams = new URLSearchParams(
      currentSearchParams.toString(),
    );
    updatedSearchParams.set("device", deviceId);
    router.replace(pathname + "?" + updatedSearchParams.toString());
  };

  const devicesSelectOptions = [
    { id: uuidv4(), label: "Sélectionner un appareil" },
    ...(devices?.devices?.map((device) => ({
      id: device.id,
      label: device.name,
    })) ?? []),
  ];

  return (
    <Select
      name="select_device"
      onChange={onChange}
      value={optimisticDeviceID}
      options={devicesSelectOptions}
    />
  );
};
