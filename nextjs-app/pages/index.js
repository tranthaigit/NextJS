import Head from 'next/head'
import Image from 'next/image'
import { Banner } from '../components/banner'
import Card from '../components/card'
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
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400}/>
        </div>
        <div className={styles.cardLayout}>
        <Card name={'DarkHouse Coffee'} imageURL="/static/hero-image.png" href="/coffee-store/darkhouse-coffee" className={styles.card}/>
        <Card name={'DarkHouse Coffee'} imageURL="/static/hero-image.png" href="/coffee-store/darkhouse-coffee" className={styles.card}/>
        <Card name={'DarkHouse Coffee'} imageURL="/static/hero-image.png" href="/coffee-store/darkhouse-coffee" className={styles.card}/>
        </div>
      </main>
    </div>
  )
}
