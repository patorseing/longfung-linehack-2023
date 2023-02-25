import Head from "next/head";
import { Center, CircularProgress } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Head>
        <title>LongFung</title>
      </Head>
      <Center sx={{ w: "100vw", h: "100vh" }}>
        <CircularProgress isIndeterminate color="primary.500" />
      </Center>
    </>
  );
};

Home.Layout = (props: React.PropsWithChildren) => <div>{props.children}</div>;

export default Home;
