import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import { Provider as StateProvider } from 'react-redux'

import { store } from '../state/store'

import '../styles/globals.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <StateProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </StateProvider>
    </CookiesProvider>
  )
}
