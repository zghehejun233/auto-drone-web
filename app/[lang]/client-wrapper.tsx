"use client";
import Sidebar from "./sidebar";
import { Metadata } from "next";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Sidebar>{children}</Sidebar>;
}
