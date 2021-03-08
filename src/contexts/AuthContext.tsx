import { signIn as nextSignIn, signOut as nextSignOut, getSession } from 'next-auth/client';
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface IUser{
  avatar_url: string;
  name: string;
  email: string;
}

interface IAuthContextData{
  singIn: (providerAuth:string) => void;
  singOut: () => void;
  userAuth: IUser;
}

interface IAuthContextProps{
  children: ReactNode;
}



export const AuthContext = createContext({} as IAuthContextData);

export function AuthContextProvider({children}:IAuthContextProps){
  const router  = useRouter();
  const [userAuth,setUserAuth] = useState<IUser>({} as IUser);
  useEffect(() => {
    async function isSession(){
      const session = await getSession();
      if(!session){
        router.push('/login');
      }else{
        setUserAuth({
          avatar_url: session.user.image,
          name: session.user.name,
          email: session.user.email
        });
      }
    }
    isSession();
  },[]);

  async function singIn(providerAuth:string){
    nextSignIn(providerAuth)
  }

  async function singOut(){
    Cookies.remove('challengesCompleted');
    Cookies.remove('level');
    Cookies.remove('challengesCompleted');
    await nextSignOut()
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{
      userAuth,
      singIn,
      singOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}