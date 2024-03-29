import dynamic from "next/dynamic";
import { getLayout } from '@/components/admin/layout';

const AdminContainerNoSSR = dynamic(() => import('../../components/admin/adminContainer'), {
  ssr: false
});

export default function AdminIndex() {
  return (
    <AdminContainerNoSSR />
  )
}

AdminIndex.getLayout = getLayout