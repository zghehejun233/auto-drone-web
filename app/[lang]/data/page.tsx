"use client";

import { Button } from "@/components/ui/button";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleX } from "lucide-react";
import { useState } from "react";

const tabs = [
  {
    title: "视频",
    anchor: "video",
  },
  {
    title: "图片",
    anchor: "image",
  },
  {
    title: "第三方",
    anchor: "3rd-party",
  },
];

const info = [
  {
    key: "创建时间",
    value: "2022-01-01 12:00:00",
  },
  {
    key: "更新时间",
    value: "2022-01-01 12:00:00",
  },
  {
    key: "创建人",
    value: "admin",
  },
  {
    key: "更新人",
    value: "admin",
  },
  {
    key: "备注",
    value: "备注",
  },
];

export default function DataPage() {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <div className="h-full p-4 pt-0">
      <Tabs defaultValue={tabs[0].anchor} className="mx-auto">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.anchor} value={tab.anchor}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.anchor} value={tab.anchor}>
            <ResizablePanelGroup
              direction={"horizontal"}
              className="gap-4"
              style={{ overflow: "visible" }}
            >
              <ResizablePanel defaultSize={75}>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 30 }).map((_, index) => (
                    <div key={index} className="mb-4">
                      <Skeleton
                        className="w-full h-48 rounded-xl"
                        onClick={() => setIsDetailOpen(true)}
                      />
                    </div>
                  ))}
                </div>
              </ResizablePanel>

              {isDetailOpen && (
                <ResizablePanel
                  defaultSize={25}
                  style={{ overflow: "visible" }}
                >
                  <div
                    id="info"
                    className="border rounded-xl shadow-sm p-4 sticky top-4"
                  >
                    <div className="flex items-center">
                      <div className="flex-grow font-semibold text-lg">
                        Title
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-700"
                        onClick={() => setIsDetailOpen(false)}
                      >
                        <CircleX />
                      </Button>
                    </div>
                    <div className="mt-2">
                      <Skeleton className="h-8 w-full rounded-ld" />
                    </div>
                    <div className="mt-4">
                      <Skeleton className="h-48 w-full rounded-ld" />
                    </div>
                    <div className="mt-4 text-md font-semibold">信息</div>

                    <div className="mt-2">
                      {info.map((e, i) => (
                        <div
                          key={e.key}
                          className={`"w-full flex items-center" ${
                            i !== info.length - 1 && "mb-2"
                          }`}
                        >
                          <div className="text-sm">{e.key}:</div>
                          <div className="flex-grow" />
                          <div className="text-sm text-gray-600">{e.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ResizablePanel>
              )}
            </ResizablePanelGroup>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
