import { loadingState } from "@/atoms/LoadingAtom";
import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { LoadingContainer } from "@/components/util/loading/Loading";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
  const isLoading = useRecoilValue(loadingState);
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
      <Footer />
      {
        isLoading ? <LoadingContainer /> : <></>
      }
    </div>
  )
}
