import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({children}: LayoutProps) => {
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
      <Footer />
    </div>
  )
}