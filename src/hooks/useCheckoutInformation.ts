import { CheckoutInfo } from "@/pages/checkout/information"
import { createContext, useCallback, useState } from "react";


export type CheckoutInformationContext = {
  info: CheckoutInfo;
  setInfo: (info: CheckoutInfo) => void;
}

const defaultInfo: CheckoutInfo = {
  lastName: "",
  firstName: "",
  zipCode: "",
  email: "",
  tellNumber: "",
  address1: "",
  address2: "",
  address3: "",
}

const defaultContext: CheckoutInformationContext = {
  info: defaultInfo,
  setInfo: () => {}
}

export const checkoutInformationContext = createContext<CheckoutInformationContext>(defaultContext);

export const useCheckoutInformation = () => {
  const [info, setInformation] = useState<CheckoutInfo>(defaultInfo);
  const setInfo = useCallback((current: CheckoutInfo): void => {
    setInformation(current);
  }, []);
  return {
    info,
    setInfo,
  };
}