import Head from "next/head";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
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
