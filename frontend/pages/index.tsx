import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import styles from "@/styles/Home.module.css"

const inter = Inter({ subsets: ["latin"] })

const Home = () => {
  return (
    <>
      <Head>
        <title>LongFung</title>
      </Head>
    </>
  )
}

Home.Layout = (props: React.PropsWithChildren) => <div>{props.children}</div>

export default Home
