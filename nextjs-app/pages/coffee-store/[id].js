import { useRouter } from "next/router";
import Link from "next/link";
import coffeeDatas from "../../data/coffee-stores.json"
import Head from "next/head";
import style from "../../styles/coffee-store.module.css"
import Image from 'next/Image'
import cls from "classnames"

export function getStaticProps(staticProps) {
  const params = staticProps.params
  return {
    props: {
      coffeeDatas: coffeeDatas.find((coffeeData) => {
        return coffeeData.id.toString() === params.id // dynamic id
      })
    }
  }
}

export function getStaticPaths() {
  const paths = coffeeDatas.map((coffeeData) => {
    return {
      params: {
        id: coffeeData.id.toString()
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

const CoffeeStore = (props) => {
  const router = useRouter();
  const { address, name, neighbourhood, imgUrl } = props.coffeeDatas

  if (router.isFallback) {
    return <div>Loading ...</div>
  }

  const handleUpvoteButton = () => {
    console.log("click");
  }

  return (
    <div className={style.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={style.container}>
        <div className={style.col1}>
          <div className={style.backToHomeLink}>
            <Link href="/">
              Back to home
            </Link>
          </div>
          <div className={style.nameWrapper}>
            <h1 className={style.name}>{name}</h1>
          </div>
          <Image src={imgUrl} width={600} height={360} className={style.storeImg} alt={name} />
        </div>
        <div className={cls("glass", style.col2)}>
          <div className={style.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" />
            <p className={style.text}>{address}</p>
          </div>
          <div className={style.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width="24" height="24" />
            <p className={style.text}>{neighbourhood}</p>
          </div>
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