import { useContext, useState } from 'react';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import { Seo } from "../components/Seo";
import styles from "../styles/components/Login.module.css";
import { AuthContext } from '../contexts/AuthContext';

export default function Home() {
  const [loading,setLoading] = useState(false);
  const { singIn } = useContext(AuthContext);

  function handleSingIn(providerAuth:string){
    setLoading(true);
    singIn(providerAuth);
  }
  return (
  <>
    <Seo title="Move it | Login" />
    <div className={styles.container}>
      <section>
        <header>
          <img src="/logo-full-white.svg" alt="Move.it" />
        </header>
        {loading ? (
          <>
          <section className={styles.containerLoading}>
            <span className={styles.loading} />
            <p>Aguarde...</p>
          </section>
          </>
        ) : (
          <>
            <strong>Bem Vindo</strong>
            <p>
              Faça login para começar
            </p>
            <div>
                  <button type="button" className={styles.github} onClick={()=>handleSingIn('github')} >
                  <img src="/icons/github.svg" alt="Github"/>
                  Github          
                  </button>
                  <button type="button" className={styles.facebook} onClick={()=>handleSingIn('facebook')} >
                  <img src="/icons/facebook.svg" alt="Facebook"/>
                  Facebook          
                  </button>
            </div>
          </>
        )}
      </section>
    </div>   
  </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if(session){
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
  return {
    props: { session }
  }
}