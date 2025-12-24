"use client"

import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react"
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
      icon: IconDashboard,
    },
    {
      title: "Confluence",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "ElephantMail",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Github",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
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
