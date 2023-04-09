import { FirebaseAuthProvider } from "@/libs/firebase/utils/auth";
import SideMenuButton from "./Button/SideMenuButton";
import SideMenuHeader from "./SideMenuHeader";

export default function SideMenuContainer() {
  return (
    <FirebaseAuthProvider>
      <div className="w-1/5 min-h-full bg-gray-700 text-white" style={{minWidth: "270px"}}>
        <SideMenuHeader />
        <SideMenuButton title="ダッシュボード" url="/admin" selected={false}/>
        <SideMenuButton title="商品一覧" url="/admin/item-list" selected={false}/>
        <SideMenuButton title="商品登録" url="/admin/item/new" selected={false}/>
        <SideMenuButton title="注文管理" url="/admin" selected={false}/>
      </div>
    </FirebaseAuthProvider>
  )
}
