import SideMenuButton from "./Button/SideMenuButton";
import SideMenuHeader from "./SideMenuHeader";

export default function SideMenuContainer() {
  return (
    <div className="w-1/5 min-h-full bg-gray-700 text-white">
      <SideMenuHeader />
      <SideMenuButton title="アイテム一覧" onClick={() => {}} selected={false}/>
      <SideMenuButton title="注文管理" onClick={() => {}} selected={false}/>
    </div>
  )
}