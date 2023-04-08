import { FirebaseAuthProvider } from "@/libs/firebase/utils/auth";
import Layout from "@/pages/admin/Layout";
import { ReactElement } from "react";

export const getLayout = (page: ReactElement) => {
  return (
    <FirebaseAuthProvider>
      <Layout>{page}</Layout>
    </FirebaseAuthProvider>
  )
}