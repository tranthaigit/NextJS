import Head from 'next/head'
import Image from 'next/Image'
import { Banner } from '../components/banner'
import Card from '../components/card'
import styles from '../styles/Home.module.css'
import { fetchCoffeeStores } from '../lib/coffee-store'
import useTrackLocation from '../hooks/use-track-location'
import { useContext, useEffect } from 'react'
import { ACTION_TYPES, StoreContext } from './_app'

export async function getStaticProps() {  
  const coffeeStore = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore
    } // will be passed to the page component as props
  }
}

export default function Home(props) {
  const { handleTrackLocation , locationErrorMsg , isFindingLocation } = useTrackLocation();
  const { dispatch , state } = useContext(StoreContext);
  const { coffeeStores , latLong } = state;

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const limit = 30
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, limit);
          console.log("fetchedCoffeeStores",fetchedCoffeeStores);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores: fetchedCoffeeStores
            }
          })} catch (error) {
            console.log("Error", { error });
          }
        }
      }
    setCoffeeStoresByLocation();
  }, [latLong]);

  const handleClickBanner = () => {
    handleTrackLocation();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Coffee Shop </h1>
        <Banner buttonText={isFindingLocation ? "Locating" : "View coffee nearby"} handleOnClick={handleClickBanner}/>
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        <div className={styles.heroImage}>
          <Image alt="banner image" src="/static/hero-image.png" width={700} height={400}/>
        </div>
        <div className={styles.sectionWrapper}>
        { props.coffeeStore.length > 0 && 
        <>
          <h2 className={styles.heading2}>Viet Nam</h2>
          <div className={styles.cardLayout}>
            {props.coffeeStore.map((coffeeData) => {
              return (
                <Card
                  key={coffeeData.id}
                  name={coffeeData.name}
                  imageURL={coffeeData.imgUrl || coffeeStore[0].imgUrl}
                  href={`/coffee-store/${coffeeData.id}`}
                />
            )})}
          </div> 
        </>
        } 
        </div>
      </main>
    </div>
  )
}
