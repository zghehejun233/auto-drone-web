import { Skeleton } from "@/components/ui/skeleton";

function StatisticsPanel() {
  return (
    <div className="mb-4">
      <div className="flex gap-4 justify-around">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-[192px] w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}

function DronesList() {
  return (
    <div className="my-4">
      <Skeleton className="h-[900px] w-full rounded-xl" />
    </div>
  );
}

export default function DronesPage() {
  return (
    <div className="min-h-screen p-4">
      <StatisticsPanel />
      <div className="my-4 flex justify-between">
        <div className="flex gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-[96px] rounded-xl" />
          ))}
        </div>

        <div className="flex gap-4">
          <Skeleton className="h-12 w-[256px] rounded-xl" />
        </div>
      </div>
      <DronesList />
    </div>
  );
}
