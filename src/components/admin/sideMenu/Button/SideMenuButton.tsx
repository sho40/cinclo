interface SideMenuButtonProps {
  title: string;
  onClick: () => void;
  selected: boolean;
}

export default function SideMenuButton(props: SideMenuButtonProps) {
  const {title, onClick, selected} = props;

  return (
    <div className={`h-16 pl-7 ${selected ? "bg-admin-palette-blue": " bg-gray-700 hover:opacity-50 hover:bg-gray-600"}`} style={{lineHeight: "4rem"}}>
      <div onClick={onClick}>
        {title}
      </div>
    </div>
  )
}
