"use client";

import React from "react";

import { getDeviceList, getTaskHistory } from "@/api/inspection/inspect";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  deviceStatusStyle,
  deviceTypeIcon,
  historyItemStatusStyle,
} from "./helper";

export default function InspectionDetailPage() {
  const deviceQuery = useQuery({
    queryFn: async () => getDeviceList(1),
    queryKey: ["device-list"],
  });

  const hisoryQuery = useQuery({
    queryFn: async () => getTaskHistory(1),
    queryKey: ["task-history"],
  });

  const [isOpen, setIsOpen] = React.useState(() => {
    const obj: Record<number, boolean> = {};
    hisoryQuery.data?.forEach((e) => {
      obj[e.id] = false;
    });
    return obj;
  });

  return (
    <div className="p-4">
      <div className="flex gap-4 items-center">
        <div className="font-semibold text-xl">Task Name</div>
        <Separator orientation="vertical" />
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
        <div className="p-2 w-72 flex flex-col gap-4">
          <div>Devices</div>
          {deviceQuery.isLoading && (
            <Loader2 className="size-8 animate-spin mx-auto text-blue-500" />
          )}
          {deviceQuery.isSuccess &&
            deviceQuery.data?.length > 0 &&
            deviceQuery.data?.map((e) => (
              <div key={e.id} className="w-full">
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
                        <div className="text-sm text-gray-500">
                          {e.modelType}
                        </div>
                        <div className="flex-grow" />
                      </div>
                      <div className="text-sm text-gray-700">
                        {e.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          <div>History</div>

          {hisoryQuery.isLoading && (
            <Loader2 className="size-8 animate-spin mx-auto text-blue-500" />
          )}
          {hisoryQuery.isSuccess && hisoryQuery.data?.length > 0 && (
            <ScrollArea className="max-h-96 min-h-32 w-full rounded-md bg-white shadow-md p-4">
              {hisoryQuery.data?.map((e, i) => (
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
                        {i !== hisoryQuery.data.length - 1 && (
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
          )}
          {hisoryQuery.isSuccess && hisoryQuery.data?.length === 0 && (
            <div>No more data</div>
          )}
        </div>
      </div>
    </div>
  );
}
