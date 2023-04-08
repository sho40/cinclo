import { ReactNode } from "react";

interface ActionButtonAreaProps {
  children: ReactNode;
}

export default function ActionButtonArea({children}: ActionButtonAreaProps) {
  return (
    <div className="pb-6">
      <div className="bg-gray-400" style={{height: "70px"} /* FIXME: 高さは仮 */}>
        {children}
      </div>
    </div>
    
  )
}