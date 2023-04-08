import Layout from "@/pages/admin/Layout";
import { ReactElement } from "react";

export const getLayout = (page: ReactElement) => {
  return (
    <Layout>{page}</Layout>
  )
}