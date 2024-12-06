"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import { Metadata } from "next";
import { Locale } from "@/i18n-config";

export const generateMetadata = async function ({
  params: { lang },
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return {
    title: "Next.js I18N App " + lang,
    description: "This is a Next.js app with server-side internationalization.",
  };
};

export default function ClientWrapper({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const pathname = usePathname();
  console.log(pathname);
  const lang = params.lang as Locale;
  return (
    <Sidebar
      params={{
        lang,
      }}
    >
      {children}
    </Sidebar>
  );
}
