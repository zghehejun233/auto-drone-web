"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDictionary } from "@/lib/dictionary";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { dictionary } = useDictionary();
  const data = {
    user: {
      name: "ThuRAY",
      email: "thuray.email@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: dictionary?.sidebar?.applications?.title,
        url: "/applications",
        icon: SquareTerminal,
        items: [
          {
            title: dictionary?.sidebar?.applications?.universal,
            url: "/applications/universal",
          },
          {
            title: dictionary?.sidebar?.applications?.inspection,
            url: "/applications/inspection",
          },
        ],
      },
      {
        title: dictionary?.sidebar?.drones?.title,
        url: "/drones",
        icon: Bot,
        items: [],
      },
      {
        title: dictionary?.sidebar?.data?.title,
        url: "/data",
        icon: BookOpen,
        items: [],
      },
      {
        title: dictionary?.sidebar?.settings?.title,
        url: "/settings",
        icon: Settings2,
        items: [
          {
            title: dictionary?.sidebar?.settings?.account,
            url: "/settings#account",
          },
          {
            title: dictionary?.sidebar?.settings?.general,
            url: "/settings#general",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "获取支持",
        url: "/support",
        icon: LifeBuoy,
      },
      {
        title: "反馈",
        url: "/feedback",
        icon: Send,
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };
  // eslint-disable-next-line
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">山东大学</span>
                  <span className="truncate text-xs">团队账号</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
