import Head from 'next/head'
import Image from 'next/Image'
import { Banner } from '../components/banner'
import Card from '../components/card'
import styles from '../styles/Home.module.css'
import coffeeDatas from '../data/coffee-stores.json'

export default function Home() {
  console.log("nextjs");
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
          {coffeeDatas.map((coffeeData) => {
            return (
              <Card 
                key={coffeeData.id}
                name={coffeeData.name}
                imageURL={coffeeData.imgUrl}
                href={`/coffee-store/${coffeeData.id}`}
              />
          )})}
        </div>
      </main>
    </div>
  )
}
