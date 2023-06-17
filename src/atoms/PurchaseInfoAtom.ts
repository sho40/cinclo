import { atom } from "recoil";

export interface PurchaseInfo {
  customerName: string;
  email: string;
  phoneNumber: string;
  postalCode: string;
  city: string;
  line1: string;
  line2: string;
  specifiedArraivalDate: string;
  returnDate: string;
}

export const purchaseInfoState = atom<PurchaseInfo>({
  key: "PurchaseInfo",
  default: {
    customerName: "",
    email: "",
    phoneNumber: "",
    postalCode: "",
    city: "",
    line1: "",
    line2: "",
    specifiedArraivalDate: "",
    returnDate: "",
  },
});