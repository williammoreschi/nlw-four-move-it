import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import  styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
  const {startNewChallenge} = useContext(ChallengesContext);
  const [time,setTime] = useState(0.1*60);
  const [isActive,setIsActive] = useState(false);
  const [hasFinished,setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown(){
    setIsActive(true);
  }
  
  function resetCountdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25*60);
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

  return(
    <div>
      <div className={`${styles.countdownContainer}`}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>
      { hasFinished ? (
        <button 
        disabled
        type="button" 
        className={`${styles.countdownButton} ${styles.countdownButtonFinished}`} 
        >
          Ciclo encerrado
          <img src="icons/check_circle.svg" alt=""/>
        </button>
      ) : (
        <>
        { isActive ? (
        <button 
        type="button" 
        className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
        onClick={resetCountdown}
        >
          Abandonar ciclo
          <object type="image/svg+xml" data="icons/close.svg" />
        </button>
        ) : (
          <button 
          type="button" 
          className={styles.countdownButton} 
          onClick={startCountdown}
          >
            Iniciar um ciclo
          <img src="icons/play_arrow.svg" alt=""/>
          </button>
        ) }
        </>
      ) }
    </div>
  );
}