import socket from '@lib/socket';

import Layout from '@components/base/Layout';

import { GlobalStyles } from '@styles/GlobalStyles';
import { antdTheme } from '@styles/antdTheme';
import theme from '@styles/theme';

import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

socket.on('connect', () => console.log('connect'));

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  const [user, setUser] = useState(null);
  const askUserName = () => {
    const userName = prompt('당신의 이름을 입력하세요');

    // .emit(대화의제목,보낼내용,콜백함수(앞에처리가잘되었으면 response받는다))
    socket.emit('login', userName, (res: any) => {
      console.log('res', res);
      if (res?.ok) {
        setUser(res.data);
      }
    });
  };

  useEffect(() => {
    askUserName();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={antdTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
