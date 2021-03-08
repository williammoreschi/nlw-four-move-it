import { Provider } from 'next-auth/client';
import { AuthContextProvider } from '../contexts/AuthContext';
import '../styles/global.css';
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </Provider>
  )
}

export default MyApp
