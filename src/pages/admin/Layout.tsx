import SideMenuContainer from "@/components/admin/sideMenu/SideMenuContainer"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

// FIXME: 管理画面専用へ移動する
export default function Layout({ children }: Props) {
  return (
    <div className='flex min-h-screen bg-admin-palette-light-gray'>
      <SideMenuContainer />
      <main className="p-7 w-full">{children}</main>
    </div>
  )
}
