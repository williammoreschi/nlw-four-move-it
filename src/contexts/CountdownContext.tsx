import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { ChallengesContext } from '../contexts/ChallengesContext';

interface ICountdownContextData{
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  resetCountdown: () => void;
  startCountdown: () => void;
}

interface ICountdownProviderProps{
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as ICountdownContextData);

export function CountdownProvider({children}: ICountdownProviderProps){
  const {startNewChallenge} = useContext(ChallengesContext);
  const [time,setTime] = useState(0.1*60);
  const [isActive,setIsActive] = useState(false);
  const [hasFinished,setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown(){
    setIsActive(true);
  }
  
  function resetCountdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setHasFinished(false);
    setTime(0.1*60);
  }

  useEffect(()=>{
    if(isActive && time > 0){
      countdownTimeout = setTimeout(()=>{
        setTime(time - 1);
      },1000);
    }else if(isActive && time == 0){
      /*Finalizou o ciclo*/
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  },[isActive,time]);
  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      resetCountdown,
      startCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  );
}