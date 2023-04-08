import { getAuth, getRedirectResult } from '@firebase/auth'
import { AuthContextState, ReactNodeProps, User } from "@/types/user.types";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseApp, auth } from "../../firebaseConfig";

const FirebaseAuthContext = createContext<AuthContextState>({
  currentUser: undefined,
})

const FirebaseAuthProvider = ({children}: ReactNodeProps) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {

     /**
     * authオブジェクトのログイン情報の初期化はonAuthStateChanged 発火時に行われる
     * onAuthStateChangedが発火する前(authオブジェクトの初期化が完了する前)にcurrentUserを参照してしまうと、ログインしていてもnullになってしまう
     * @see {@link https://firebase.google.com/docs/auth/web/manage-users}<br>
     * そのため、userデータの参照はonAuthStateChanged内で行う
     */

     const unsubscribed = auth.onAuthStateChanged((user) => {
      if(user != null) {
        setCurrentUser(user);
      }

      getRedirectResult(getAuth(firebaseApp));

      return () => {
        // onAuthStateChangedはfirebase.Unsubscribeを返すので、ComponentがUnmountされるタイミングでUnsubscribe(登録解除)しておく
        unsubscribed()
      }
     })

  }, [])

  return (
    <FirebaseAuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export { FirebaseAuthContext, FirebaseAuthProvider }
export const UserFirebaseAuthContext = () => useContext(FirebaseAuthContext)