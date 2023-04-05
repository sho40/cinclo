import SideMenuButton from "./Button/SideMenuButton";
import SideMenuHeader from "./SideMenuHeader";

export default function SideMenuContainer() {
  return (
    <div className="w-1/5 min-h-full bg-gray-700 text-white" style={{minWidth: "270px"}}>
      <SideMenuHeader />
      <SideMenuButton title="ダッシュボード" onClick={() => {}} selected={false}/>
      <SideMenuButton title="アイテム一覧" onClick={() => {}} selected={false}/>
      <SideMenuButton title="注文管理" onClick={() => {}} selected={false}/>
    </div>
  )
}