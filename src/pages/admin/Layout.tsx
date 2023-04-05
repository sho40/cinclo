import SideMenuContainer from "@/components/admin/sideMenu/SideMenuContainer"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  console.log("Layout")
  return (
    <div className='flex min-h-screen bg-admin-palette-light-gray'>
      <SideMenuContainer />
      <main>{children}</main>
    </div>
  )
}