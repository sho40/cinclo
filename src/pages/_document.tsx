import { Analytics } from '@/components/Analytics'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Analytics />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
