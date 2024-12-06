import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

function SettingsSidebar() {
  const links = [
    {
      title: "账户",
      url: "#account",
    },
    {
      title: "通用",
      url: "#general",
    },
  ];
  return (
    <div className="ml-4 flex flex-col gap-4 justify-end">
      {links.map((link, index) => (
        <div key={index}>
          <Link href={`${link.url}`} passHref>
            <Skeleton className="h-12 w-full rounded-lg" />
          </Link>
        </div>
      ))}
    </div>
  );
}

function SettingsContent() {
  return (
    <>
      <Skeleton id="account" className="mb-4 h-[800px] w-full rounded-lg" />
      <Skeleton id="general" className="mb-4 h-[400px] w-full rounded-lg" />
    </>
  );
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="flex">
        {/* 右侧内容 */}
        <div className="w-3/4">
          <SettingsContent />
        </div>
        <div className="w-1/4">
          <SettingsSidebar />
        </div>
      </div>
    </div>
  );
}
