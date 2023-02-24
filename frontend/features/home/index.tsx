import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { useProfileContext } from "@/context/profile";

const Home = () => {
  const router = useRouter();
  const { profile } = useProfileContext();

  useEffect(() => {
    console.log("this", profile?.userId);
    profile?.userId && router.push("/registration");
  }, [profile?.userId]);

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
