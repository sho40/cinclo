import Link from "next/link";

interface SideMenuButtonProps {
  title: string;
  url: string;
  selected: boolean;
}

export default function SideMenuButton(props: SideMenuButtonProps) {
  const {title, selected, url} = props;

  return (
    <div className={`h-16 pl-7 ${selected ? "bg-admin-palette-blue": " bg-gray-700 hover:opacity-50 hover:bg-gray-600"}`} style={{lineHeight: "4rem"}}>
      <div>
        <Link href={url}>
          {title}
        </Link>
      </div>
    </div>
  )
}
