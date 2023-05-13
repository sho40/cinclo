import Link from "next/link";

export default function CheckoutSuccess() {
  return(
    <div>
      <p>決済完了しました。</p>
      <Link href="/">Topへ</Link>
    </div>
  )
}