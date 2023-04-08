import MainContainer from '@/components/admin/main/MainContainer';
import { getAuth } from '@firebase/auth'
import { useEffect } from "react";
import { signIn } from "@/libs/firebase/hooks";
import { FirebaseAuthProvider } from '@/libs/firebase/utils/auth';
import { firebaseApp } from "@/libs/firebase/firebaseConfig";

export default function AdminContainer() {
  const auth = getAuth(firebaseApp)

  useEffect(() => {
    signIn()
  }, [auth])

  return (
    <FirebaseAuthProvider>
      <MainContainer />
    </FirebaseAuthProvider>
  )
}
