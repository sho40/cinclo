import { logOut } from "@/libs/firebase/hooks";
import { UserFirebaseAuthContext } from '@/libs/firebase/utils/auth/index'

export default function SideMenuHeader() {

  const auth = UserFirebaseAuthContext();
  const userName = auth.currentUser?.displayName;

  return (
    <div>
      <div className="h-20 px-7 bg-black" style={{ lineHeight: "5rem"}}>
        <div className="flex justify-between items-center">
          <span className="text-lg">{userName ?? '不明ユーザー'}</span>
          <div>
            <div onClick={() => logOut()}><p>ログアウト</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}
