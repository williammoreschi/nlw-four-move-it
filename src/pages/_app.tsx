import { GetServerSideProps } from 'next';
import { AuthContextProvider } from '../contexts/AuthContext'
import '../styles/global.css'
function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
