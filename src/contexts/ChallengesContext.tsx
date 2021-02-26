import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';
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
  completeChallenge: () => void;
}

const iconsNotification = ['🎯','♟️','⛰️','🎉','🥇','🏹','✌️','👋','🤔','🤖','👌','🧠','👀'];

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

  useEffect(() => {
    Notification.requestPermission();
  },[]);

  useEffect(()=>{
    Cookies.set('level',String(level));
    Cookies.set('currentExperience',String(currentExperience));
    Cookies.set('challengesCompleted',String(challengesCompleted));

  },[level,currentExperience,challengesCompleted]);

  function levelUp(){
    setLevel(level+1);
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const randomIconsNotificationIndex = Math.floor(Math.random() * iconsNotification.length);
    const challenge = challenges[randomChallengeIndex];
    const iconSelect = iconsNotification[randomIconsNotificationIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification(`Novo desafio ${iconSelect}`, {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }
  
  function resetChallenge(){
    setActiveChallenge(null);
  }

  function completeChallenge(){
    if(!activeChallenge){
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    
    if(finalExperience >= experienceToNextLevel){
      finalExperience -= experienceToNextLevel;
      levelUp(); 
    }
    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted+1);
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
      completeChallenge,
      }}>
      {children}
    </ChallengesContext.Provider>
  )
}