import HomeContainer from '@container/home/HomeContainer';

import Layout from '@components/base/Layout';

import useAuthStore from '@/stores/auth';

import type { NextPage } from 'next';

const Home: NextPage = () => {
  // const { user } = useAuthStore();
  // console.log(user);
  return (
    <Layout>
      <HomeContainer />
    </Layout>
  );
};

export default Home;
