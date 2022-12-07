import { useRouter } from "next/router"
import Head from "next/head"

const dynamicRoute = () => {
  const router = useRouter();
  const query = router.query.dynamic;

  return <div>
    <Head>
      <title>{query}</title>
    </Head>
    Dynamic routes {query}
    </div>
}

export default dynamicRoute;