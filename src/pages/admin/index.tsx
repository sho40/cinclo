import dynamic from "next/dynamic";
import { getLayout } from '@/components/admin/layout';
import { FirebaseAuthProvider } from "@/libs/firebase/utils/auth";

const AdminContainerNoSSR = dynamic(() => import('./adminContainer'), {
  ssr: false
});

export default function AdminIndex() {
  return (
    <FirebaseAuthProvider>
      <AdminContainerNoSSR />
    </FirebaseAuthProvider>
  )
}

AdminIndex.getLayout = getLayout