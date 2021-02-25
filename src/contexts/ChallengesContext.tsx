import { createContext, ReactNode, useState } from "react";
import  challenges from '../../challenges.json';

interface IChallenge{
  type: 'eye' | 'body';
  description: string;
  amount: number
}
interface IChallengesContextData{
  level: number;
  currentExperience: number;
  challengesCompleted:number;
  activeChallenge: IChallenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
}

interface IChallengesProviderProps{
  children: ReactNode;
}
export const ChallengesContext = createContext({} as IChallengesContextData);

export function ChallengesProvider({children}:IChallengesProviderProps){
  const [level,setLevel] = useState(1);
  const [currentExperience,setCurrentExperience] = useState(0);
  const [challengesCompleted,setChallengesCompleted] = useState(0);
  const [activeChallenge,setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4,2);

  function levelUp(){
    setLevel(level+1);
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }
  
  function resetChallenge(){
    setActiveChallenge(null);
  }

  return(
    <ChallengesContext.Provider value={{
      level,
      currentExperience, 
      challengesCompleted,
      activeChallenge,
      experienceToNextLevel,
      levelUp,
      startNewChallenge,
      resetChallenge,
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}