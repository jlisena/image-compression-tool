"use client"

import * as React from "react"
import {
  BarChart3,
  LayoutDashboard,
  Folder,
  ListTodo,
  Users,
} from "lucide-react"
import InizioLogo from "@/components/logo-svg"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "MailFlow",
      url: "https://www.google.com",
      icon: LayoutDashboard,
    },
    {
      title: "Confluence",
      url: "#",
      icon: ListTodo,
    },
    {
      title: "ElephantMail",
      url: "#",
      icon: BarChart3,
    },
    {
      title: "Github",
      url: "#",
      icon: Folder,
    },
    {
      title: "Team",
      url: "#",
      icon: Users,
    },
  ],
}

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
  )
}
