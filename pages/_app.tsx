import Layout from '@components/base/Layout';
import { antdTheme } from '@styles/antdTheme';
import { GlobalStyles } from '@styles/GlobalStyles';
import theme from '@styles/theme';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

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
