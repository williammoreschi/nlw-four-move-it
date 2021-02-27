import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useState } from "react";
import { Seo } from "../components/Seo";
import styles from "../styles/components/Login.module.css";

export default function Home() {
  const [userName,setUserName] = useState('');
  const router  = useRouter();

  const handleSingIn = async ()=>{
    try {
      const response = await fetch(`https://api.github.com/users/${userName}`);
      const data = await response.json();
      if(data.message){
        alert(`${data.message === 'Not Found' ? 'Seu usuário não foi encontrado' : data.message}`);
        return;
      }
      const user = {
        avatar_url: data.avatar_url,
        name: data.name,
        login: data.login
      };
      Cookies.set('user',JSON.stringify(user));
      router.push('/');
    } catch (err) {
      alert("Github não responde");
    }
  }
  return (
  <>
    <Seo title="Move it | Login" />
    <div className={styles.container}>
      <section>
        <header>
          <img src="/logo-full-white.svg" alt="Move.it" />
        </header>
        <strong>Bem Vindo</strong>
        <p>
          <img src="/icons/github.svg" alt="Github"/>
          Faça login com seu Github para começar
        </p>
        <div>
          <input type="text" placeholder="Digite seu username" onChange={(e)=> setUserName(e.target.value.trim())} />
          <button type="button" disabled={!userName} onClick={handleSingIn} >
          <img src="/icons/arrow-right.svg" alt="Entrar" />
          </button>
        </div>
      </section>
    </div>   
  </>
  );
}
