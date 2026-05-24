"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ItemProps {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
}

export function NavMain({ items }: { items: ItemProps[] }) {
  const pathname = usePathname()

  console.log(pathname)
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              isActive={pathname === item.url}
              tooltip={item.title}
            >
              <Link href={item.url} className="flex items-center gap-2">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
