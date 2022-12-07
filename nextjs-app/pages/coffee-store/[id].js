import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
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
    </div>
  );
};

export default CoffeeStore;