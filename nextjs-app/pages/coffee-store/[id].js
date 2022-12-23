import { useRouter } from "next/router";
import Link from "next/link";
import coffeeStoresDefault from "../../data/coffee-stores.json"
import Head from "next/head";
import style from "../../styles/coffee-store.module.css"
import Image from 'next/Image'
import cls from "classnames"
import { fetchCoffeeStores } from "../../lib/coffee-store";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true
  }
}

const CoffeeStore = (props) => {
  const router = useRouter();
  const { name, address, neighbourhood, imgUrl } = props.coffeeStore;

  if (router.isFallback) {
    return <div>Loading ...</div>
  }

  const handleUpvoteButton = () => {}

  return (
    <div className={style.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={style.container}>
        <div className={style.col1}>
          <div className={style.backToHomeLink}>
            <Link href="/">
            ← Back to home
            </Link>
          </div>
          <div className={style.nameWrapper}>
            <h1 className={style.name}>{name}</h1>
          </div>
          <Image 
            src={imgUrl || coffeeStoresDefault[0].imgUrl}             
            width={600}
            height={360} 
            className={style.storeImg} 
            alt={name} 
          />
        </div>
        <div className={cls("glass", style.col2)}>
          {address && (<div className={style.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" />
            <p className={style.text}>{address}</p>
          </div>)}
          {neighbourhood && (<div className={style.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width="24" height="24" />
            <p className={style.text}>{neighborhood}</p>
          </div>)}
          <div className={style.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" />
            <p className={style.text}>1</p>
          </div>

          <button className={style.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;