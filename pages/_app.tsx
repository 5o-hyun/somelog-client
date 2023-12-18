import socket from '@lib/socket';

import AuthProvider from '@components/provider/AuthProvider';

import { GlobalStyles } from '@styles/GlobalStyles';
import { antdTheme } from '@styles/antdTheme';
import theme from '@styles/theme';

import '../styles/font.css';
import { ConfigProvider } from 'antd';
import axios from 'axios';
import type { AppContext, AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';

// socket.on('connect', () => console.log('connect'));
axios.defaults.withCredentials = true;

function MyApp({
  Component,
  pageProps,
  props,
}: AppProps & { props: { isLoggedIn: boolean } }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ConfigProvider theme={antdTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AuthProvider isLoggedIn={props.isLoggedIn}>
            <Component {...pageProps} />
          </AuthProvider>
        </ThemeProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

// 페이지를 렌더링하기전에 데이터를조작 : 서버에서 데이터를 가져와 props로 전달
MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const loginCookie = ctx.req?.headers.cookie
    ?.split(' ')
    .find((cookie) => cookie.startsWith('connect.sid'));

  // 로그인이 필요없는 페이지
  if (ctx.asPath === '/join' || ctx.asPath === '/login') {
    return {
      props: { isLoggedIn: !!loginCookie },
    };
  }

  // 로그인이 필요한 페이지인데 쿠키가 없을경우 리다이렉트
  if (!loginCookie) {
    ctx.res?.writeHead(307, { Location: '/join' });
    ctx.res?.end();
  }

  // 나머지 : 로그인이 필요하고 쿠키가 있는 페이지
  return {
    props: { isLoggedIn: !!loginCookie },
  };
};

export default MyApp;
