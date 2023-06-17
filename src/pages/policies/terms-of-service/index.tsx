import { Layout } from "@/components/customer/Layout";
import styles from "./termsOfService.module.scss"
import { TermsOfServiceComponent } from "@/components/customer/terms-of-service/termsOfService";

export default function TermsOfService() {
  return (
    <Layout>
      <TermsOfServiceComponent classname={styles.container}/>
    </Layout>
  )
}