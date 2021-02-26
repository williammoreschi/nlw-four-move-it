import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

import  styles from '../styles/components/Countdown.module.css';



export function Countdown(){
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    resetCountdown, 
    startCountdown
  } = useContext(CountdownContext);
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

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