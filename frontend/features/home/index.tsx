import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { useProfileContext } from "@/context/profile";

const Home = () => {
  const router = useRouter();
  const { profile } = useProfileContext();

  useEffect(() => {
    profile?.userId && router.push("/registration");
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
