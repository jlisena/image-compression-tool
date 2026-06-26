"use client";

import * as React from "react";
import { House, ListTodo } from "lucide-react";
import InizioLogo from "@/components/layout/logo-svg";
import { NavMain } from "@/components/layout/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Confluence",
      url: "https://evoke-melt.atlassian.net/wiki/spaces/EL/overview",
      icon: ListTodo,
    },
    {
      title: "Workfront",
      url: "https://inizioevoke.my.workfront.com/boards/675cb1c14f5fa16456dfc409",
      icon: House,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <InizioLogo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
