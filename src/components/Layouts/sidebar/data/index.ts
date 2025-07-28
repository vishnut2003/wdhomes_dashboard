import * as Icons from "../icons";
import { RemixiconComponentType, RiAddLine, RiDashboard3Line, RiGroupLine, RiListCheck2, RiUserAddLine } from "@remixicon/react"

interface SidebarMenuItemsInterface {
  label: string,
  items: {
    title: string,
    icon: RemixiconComponentType,
    url?: string,
    items?: {
      title: string,
      url: string,
    }[]
  }[]
}

export const NAV_DATA: SidebarMenuItemsInterface[] = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: RiDashboard3Line,
        items: [],
        url: "/app",
      },
    ],
  },
  {
    label: "Listings",
    items: [
      {
        title: "All Listings",
        icon: RiListCheck2,
        url: "/app/listings",
      },
      {
        title: "Add Listings",
        icon: RiAddLine,
        url: "/app/listings/add",
      }
    ]
  },
  {
    label: "Users",
    items: [
      {
        title: "All Users",
        icon: RiGroupLine,
        url: "/app/admin/users",
      },
      {
        title: "Add Users",
        icon: RiUserAddLine,
        url: "/app/admin/users/add",
      }
    ]
  }
];
