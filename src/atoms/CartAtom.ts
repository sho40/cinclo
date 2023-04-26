import { Brands, Images, Maybe } from "@/libs/apollo/graphql";
import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist'

export interface CartItem {
  id: number,
  name: string,
  brand?: Maybe<Brands>,
  current_count: number,
  current_price: number,
  regular_price?: Maybe<number>
  gender: number,
  images: Array<Images>,
}

const { persistAtom } = recoilPersist() 

export const cartItemListState = atom<CartItem[]>({
  key: "CartItemList",
  default: [],
  effects_UNSTABLE: [persistAtom]
});