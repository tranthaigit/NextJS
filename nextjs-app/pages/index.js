import Head from 'next/head'
import Image from 'next/Image'
import { Banner } from '../components/banner'
import Card from '../components/card'
import styles from '../styles/Home.module.css'
import coffeeDatas from '../data/coffee-stores.json'

export async function getStaticProps(context) {
  return {
    props: {
      coffeeDatas
    } // will be passed to the page component as props
  }
}

export default function Home(props) {
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
          <Image alt="banner image" src="/static/hero-image.png" width={700} height={400}/>
        </div>
        { coffeeDatas.length > 0 && 
        <>
          <h2 className={styles.heading2}>Viet Nam</h2>
          <div className={styles.cardLayout}>
            {props.coffeeDatas.map((coffeeData) => {
              return (
                <Card
                  key={coffeeData.id}
                  name={coffeeData.name}
                  imageURL={coffeeData.imgUrl}
                  href={`/coffee-store/${coffeeData.id}`}
                />
            )})}
          </div> 
        </>
        }
      </main>
    </div>
  )
}
