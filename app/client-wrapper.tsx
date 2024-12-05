"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log(pathname);

  return <Sidebar>{children}</Sidebar>;
}
