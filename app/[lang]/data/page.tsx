import { Skeleton } from "@/components/ui/skeleton";

export default function DataPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="flex gap-4 justify-around">
        {Array.from({ length: 3 }).map((_, index) => (
          // <div key={index} className="flex flex-col gap-4">
          <Skeleton className="h-[192px] w-full rounded-xl" />
          // </div>
        ))}
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="my-4">
          <Skeleton className="mb-4 h-[42px] w-[256px] rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}
