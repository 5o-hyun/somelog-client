import { GlobalStyles } from '@styles/GlobalStyles';
import theme from '@styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { antdTheme } from '@styles/antdTheme';
import { ConfigProvider } from 'antd';
import axios from 'axios';
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
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
