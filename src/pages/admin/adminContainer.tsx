import MainContainer from '@/components/admin/main/MainContainer';
import { FirebaseAuthProvider } from "@/libs/firebase/utils/auth";
import { getAuth } from '@firebase/auth'
import { useEffect } from "react";
import { signIn } from "@/libs/firebase/hooks";

export default function AdminContainer() {
  const auth = getAuth()

  useEffect(() => {
    signIn()
  }, [auth])
  return (
    <>
      <MainContainer />
    </>
  )
}
