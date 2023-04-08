import { logOut } from "@/libs/firebase/hooks";

export default function SideMenuHeader() {
  return (
    <div>
      <div className="h-20 px-7 bg-black" style={{ lineHeight: "5rem"}}>
        <div className="flex justify-between items-center">
          <span className="text-lg">ユーザー名</span>
          <div>
            <div onClick={() => logOut()}>ログアウト</div>
          </div>
        </div>
      </div>
    </div>
  )
} 