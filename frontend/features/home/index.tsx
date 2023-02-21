import Head from "next/head";

const Home = () => {
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
