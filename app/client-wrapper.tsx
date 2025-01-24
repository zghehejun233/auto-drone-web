"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Metadata } from "next";
import Sidebar from "./[lang]/sidebar";

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

const queryClient = new QueryClient();

export default function ClientWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar>{children}</Sidebar>
    </QueryClientProvider>
  );
}
