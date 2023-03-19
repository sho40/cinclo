import { Header } from '@/components/Header'
import Head from 'next/head'
import Image from 'next/image'


export default function Home() {
  return (
    <>
      <Header />
      <h1 className='text-8xl text-purple-600'>hello cinclo</h1>
    </>
  )
}
