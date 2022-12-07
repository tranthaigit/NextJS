import Head from 'next/head'
import Image from 'next/image'
import { Banner } from '../components/banner'
import styles from '../styles/Home.module.css'

export default function Home() {

  const handleClickBanner = () => {
    console.log("Click banner")
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Coffee Shop </h1>
        <Banner buttonText="View coffee nearby" handleOnClick={handleClickBanner}/>
      </main>

    </div>
  )
}
