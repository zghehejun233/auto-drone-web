import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function InspectionPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between align-items-center">
        <div className="flex gap-4">
          <Skeleton className="h-12 w-[96px] rounded-lg" />
          <Skeleton className="h-12 w-[96px] rounded-lg" />
        </div>
        <Button className="rounded-lg">创建</Button>
      </div>
      <div className="my-4">
        <Skeleton className="h-[900px] w-full rounded-lg" />
      </div>
    </div>
  );
}
