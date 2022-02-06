import { ChakraProvider } from "@chakra-ui/react"
import 'focus-visible/dist/focus-visible'
import theme from "../styles/theme"

import { AppPropsWithLayout } from '@lib/types';
import store from '@lib/redux/store'
import { Provider as ReduxProvider } from 'react-redux'

import Layout from '@components/Layout';
import Head from "next/head";




export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ||
    Component.navbarTitle && (
      (page) =>
        <Layout
          navbarTitle={Component.navbarTitle}
          children={page}
        />
    ) || (
      (page) =>
        <Layout
          children={page}
        />
    );

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Minted</title>
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider >
    </ReduxProvider>
  );
}