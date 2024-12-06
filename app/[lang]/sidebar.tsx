import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/dictionary";
import { usePathname } from "next/navigation";

export default function Sidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pathnameArray = pathname.split("/").slice(2);
  const pathnameArrayFiltered = pathnameArray.filter((item) => item !== "");
  //   生成面包屑导航
  const breadcrumbArray = pathnameArrayFiltered.map((item, index) => {
    return (
      <>
        <BreadcrumbItem key={index}>
          <BreadcrumbLink href={`/${item}`}>{item}</BreadcrumbLink>
        </BreadcrumbItem>
        {index === pathnameArrayFiltered.length - 1 ? null : (
          <BreadcrumbSeparator />
        )}
      </>
    );
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>{breadcrumbArray}</BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
