import socket from '@lib/socket';

import { GlobalStyles } from '@styles/GlobalStyles';
import { antdTheme } from '@styles/antdTheme';
import theme from '@styles/theme';

import '../styles/font.css';
import { ConfigProvider } from 'antd';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

// socket.on('connect', () => console.log('connect'));
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={antdTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Component {...pageProps} />
        </ThemeProvider>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
