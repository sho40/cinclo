import { checkoutInformationContext, useCheckoutInformation } from "@/hooks/useCheckoutInformation";
import { useContext } from "react";
import { Layout } from '@/components/customer/Layout'

export default function PaymentConfirm() {

  const ctx = useCheckoutInformation();
  const checkoutInfoCtx = useContext(checkoutInformationContext);

  return (
    <Layout>
      <checkoutInformationContext.Provider value={ctx}>
        <div>
          {checkoutInfoCtx.info.email}
        </div>

      </checkoutInformationContext.Provider>
    </Layout>
  )
}