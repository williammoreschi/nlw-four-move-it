import { createContext, ReactNode, useState } from "react";

interface IChallengesContextData{
  level: number;
  currentExperience: number;
  challengesCompleted:number;
  levelUp: () => void;
  startNewChallenge: () => void;
}

interface IChallengesProviderProps{
  children: ReactNode;
}
export const ChallengesContext = createContext({} as IChallengesContextData);

export function ChallengesProvider({children}:IChallengesProviderProps){
  const [level,setLevel] = useState(1);
  const [currentExperience,setCurrentExperience] = useState(0);
  const [challengesCompleted,setChallengesCompleted] = useState(0);

  function levelUp(){
    setLevel(level+1);
  }

  function startNewChallenge(){
    console.log('startNewChallenge');
  }
  return(
    <ChallengesContext.Provider value={{
      level,
      currentExperience, 
      challengesCompleted,
      levelUp,
      startNewChallenge,
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}