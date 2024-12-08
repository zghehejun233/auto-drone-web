"use client";

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import useMediaQuery from "@/hooks/use-media-query";
import { useDictionary } from "@/lib/dictionary";

export default function UniversalPage() {
  const md = useMediaQuery("(min-width: 768px)");
  const { dictionary } = useDictionary();

  const panelStyles = "h-full flex flex-col gap-2";
  const panelTitleStyles = "flex-grow flex items-center justify-center";

  return (
    <div className="p-4 h-full flex flex-col gap-4">
      <div className="h-12 w-full flex justify-between items-center">
        <Skeleton className="h-full w-full rounded-lg" />
        <Button className="ml-4">
          {dictionary?.application?.universal?.action}
        </Button>
      </div>

      <ResizablePanelGroup
        direction={md ? "horizontal" : "vertical"}
        className="flex-grow rounded-lg"
      >
        <ResizablePanel defaultSize={25} className="p-2 flex-grow">
          <div className={`${panelStyles}`}>
            <div className={`${panelTitleStyles}`}>
              {dictionary?.application?.universal?.map}
            </div>
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={25} className="p-2 flex-grow">
          <div className={`${panelStyles}`}>
            <div className={`${panelTitleStyles}`}>
              {dictionary?.application?.universal?.livestream}
            </div>
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
