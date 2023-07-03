import { FirebaseAuthProvider } from "@/libs/firebase/utils/auth";
import SideMenuButton from "./Button/SideMenuButton";
import SideMenuHeader from "./SideMenuHeader";
import styles from "./sideMenu.module.scss"

export default function SideMenuContainer() {
  return (
    <FirebaseAuthProvider>
      <div className={`w-1/5 min-h-full bg-gray-700 text-white ${styles.container}`} style={{minWidth: "270px"}}>
        <SideMenuHeader />
        <SideMenuButton title="ダッシュボード" url="/admin" selected={false}/>
        <SideMenuButton title="商品一覧" url="/admin/item-list" selected={false}/>
        <SideMenuButton title="注文管理" url="/admin/order-list" selected={false}/>
        <SideMenuButton title="お問合せ管理" url="/admin/contact-management" selected={false}/>
        <SideMenuButton title="商品登録" url="/admin/item/new" selected={false}/>
        <SideMenuButton title="ブランド登録" url="/admin/register/brand" selected={false}/>
        <SideMenuButton title="カテゴリー登録" url="/admin/register/category" selected={false}/>
        <SideMenuButton title="子カテゴリー登録" url="/admin/register/category/child" selected={false}/>
      </div>
    </FirebaseAuthProvider>
  )
}
