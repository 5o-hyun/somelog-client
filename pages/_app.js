import { GlobalStyles } from '@styles/GlobalStyles';
import theme from '@styles/theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import { antdTheme } from '@styles/antdTheme';
import { ConfigProvider } from 'antd';
import axios from 'axios';
import { MessageProvider } from '@components/base/MessageProvider';
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <MessageProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={antdTheme}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Component {...pageProps} />
          </ThemeProvider>
        </ConfigProvider>
      </QueryClientProvider>
    </MessageProvider>
  );
}

export default MyApp;
