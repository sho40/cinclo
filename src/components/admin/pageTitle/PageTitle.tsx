import { ReactNode } from "react";

interface PageTitleProps {
  title: string;
}

export default function PageTitle({title}: PageTitleProps) {
  return(
    <>
      <div className="text-4xl pb-7">{title}</div>
    </>
  )
}