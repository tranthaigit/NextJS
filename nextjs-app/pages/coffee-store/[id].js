import { useRouter } from "next/router";
import Link from "next/link";
import coffeeDatas from "../../data/coffee-stores.json"

export function getStaticProps(staticProps) {
  const params =  staticProps.params
  console.log("params",params);
  return {
    props: {
      coffeeDatas : coffeeDatas.find((coffeeData) => {
          return coffeeData.id.toString() === params.id // dynamic id
      })
    }
  }
}

export function getStaticPaths() {
  return {
    paths : [
      {params: {id : '0'}},
      {params: {id : '1'}},
      {params: {id : '300'}}
    ],
    fallback : false
  }
}

const CoffeeStore = (props) => {
  const router = useRouter();
  console.log("router", router);
  return (
    <div>
      Coffee Store Page
      <Link href="/">
        Back to home
      </Link>
      <Link href="/coffee-store/dynamic">
        Go to dynamic
      </Link>
      <Link href="localhost:3000/courses/nextjs">
        Go to next
      </Link>
      <p>{props.coffeeDatas.address}</p>
      <p>{props.coffeeDatas.name}</p>
    </div>
  );
};

export default CoffeeStore;