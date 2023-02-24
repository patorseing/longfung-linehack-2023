import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/registration");
  }, []);

  return (
    <>
      <Head>
        <title>LongFung</title>
      </Head>
    </>
  );
};

Home.Layout = (props: React.PropsWithChildren) => <div>{props.children}</div>;

export default Home;
