import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})


function MyApp({ Component, pageProps }) {

  return <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
}

export default MyApp
