import HomeContainer from '@container/home/HomeContainer';

import Layout from '@components/base/Layout';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Layout>
      <HomeContainer />
    </Layout>
  );
};

export default Home;
