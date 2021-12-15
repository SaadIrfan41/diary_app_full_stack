import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'
import '@material-tailwind/react/tailwind.css'
import 'material-icons/iconfont/material-icons.css'
import Layout from '../component/Layout'
import store from '../store/store'
import { Provider as ReduxStore } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import client from '../utils/api'
import NextNprogress from 'nextjs-progressbar'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ReduxStore store={store}>
        <Provider>
          <NextNprogress
            color='#FBC02D'
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Provider>
      </ReduxStore>
    </ApolloProvider>
  )
}
export default MyApp
