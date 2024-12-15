"use client";

import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Container, Plane } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export interface JobHistoryProps {
  id: number;
  name: string;
  status: string;
  time: string;
}

const jobStatusMap: Record<string, string> = {
  "0": "Running",
  "1": "Success",
  "2": "Failed",
  "3": "Stopped",
  "4": "Paused",
  "5": "Waiting",
  "6": "Unknown",
};

const historyItemStatusStyle = (status: string) => {
  switch (status) {
    case "Running":
      return "text-green-500";
    case "Success":
      return "text-green-500";
    case "Failed":
      return "text-red-500";
    case "Stopped":
      return "text-red-500";
    case "Paused":
      return "text-yellow-500";
    case "Waiting":
      return "text-yellow-500";
    case "Unknown":
      return "text-yellow-500";
    default:
      return "text-yellow-500";
  }
};

export interface DeviceProps {
  id: number;
  name: string;
  description: string;
  status: string;
  modelType: string;
}

const deviceStatusMap: Record<string, string> = {
  "0": "Online",
  "1": "Offline",
  "2": "Unknown",
};

const deviceStatusStyle = (status: string) => {
  switch (status) {
    case "Online":
      return "bg-green-500";
    case "Offline":
      return "bg-red-500";
    case "Unknown":
      return "bg-yellow-500";
    default:
      return "bg-yellow-500";
  }
};

const deviceTypeIcon = (status: string) => {
  const style = "size-4";
  switch (status) {
    case "drone":
      return <Plane className={style} />;
    case "dock":
      return <Container className={style} />;
    default:
      return <></>;
  }
};

export default function InspectionDetailPage() {
  const devices: DeviceProps[] = [
    {
      id: 1,
      name: "Device 1",
      description: "This is a description",
      status: deviceStatusMap[Math.floor(Math.random() * 3).toString()],
      modelType: "drone",
    },
    {
      id: 2,
      name: "Device 2",
      description: "This is a description",
      status: deviceStatusMap[Math.floor(Math.random() * 3).toString()],
      modelType: "dock",
    },
  ];
  const jobHistory: JobHistoryProps[] = Array.from({ length: 10 }).map(
    (_, i) => ({
      id: i,
      name: `Task ${i}`,
      status: jobStatusMap[Math.floor(Math.random() * 6).toString()],
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    })
  );
  const [isOpen, setIsOpen] = React.useState(() => {
    const obj: Record<number, boolean> = {};
    devices.forEach((e) => {
      obj[e.id] = false;
    });
    return obj;
  });

  return (
    <div className="p-4">
      <div className="flex gap-4 items-center">
        <div className="font-semibold text-xl">Task Name</div>
        <Separator orientation="vertical" className="mx-2" />
        <div className="text-gray-500">1234567890</div>
        <div className="flex-grow" />
        <div>Running</div>
        <div className="rounded-full size-4 bg-green-500" />
      </div>
      <Separator className="my-4" />
      <div className="flex gap-4">
        <div className="p-2 flex-grow">
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
        <div className="p-2 flex flex-col gap-4">
          <div>Devices</div>

          {devices.map((e) => (
            <div key={e.id} className="w-72">
              <div className="w-full rounded-lg shadow-md bg-white overflow-hidden">
                <div
                  className="px-4 py-2 text-left font-medium text-gray-900 hover:cursor-pointer"
                  onClick={() => {
                    setIsOpen((prev) => ({
                      ...prev,
                      [e.id]: !prev[e.id],
                    }));
                  }}
                >
                  <div className="flex gap-2 items-center">
                    {deviceTypeIcon(e.modelType)}
                    <div>{e.name}</div>
                    <div className="flex-grow" />
                    <div className="text-sm text-gray-500">{e.status}</div>
                    <div className="relative flex size-4">
                      <div
                        className={`${deviceStatusStyle(
                          e.status
                        )} rounded-full absolute inline-flex size-full opacity-70 animate-ping duration-[3000ms]`}
                      />
                      <div
                        className={`${deviceStatusStyle(
                          e.status
                        )} rounded-full relative inline-flex h-full w-full`}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`"overflow-hidden transition-all ease-in-out duration-500" ${
                    isOpen[e.id] ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-4 py-2">
                    <Separator className="mb-2" />
                    <div className="mb-2 flex gap-2 items-center">
                      <div className="text-sm text-gray-500">{e.modelType}</div>
                      <div className="flex-grow" />
                    </div>
                    <div className="text-sm text-gray-700">{e.description}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div>History</div>
          <ScrollArea className="max-h-96 min-h-32 w-72 rounded-md bg-white shadow-md p-4">
            {jobHistory.map((e, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <>
                      <div className="flex gap-2 items-center">
                        <div className="text-sm w-8">{e.id}</div>
                        <div
                          className={`"text-sm" ${historyItemStatusStyle(
                            e.status
                          )}`}
                        >
                          {e.status}
                        </div>
                        <div className="flex-grow" />
                        <div className="text-sm">{e.time}</div>
                      </div>
                      {i !== jobHistory.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </>
                  </TooltipTrigger>
                  <TooltipContent align="start">
                    <div className="text-sm">{e.name}</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
