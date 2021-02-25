import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
  const {activeChallenge, resetChallenge} = useContext(ChallengesContext);

  function challengeFailed(){
    resetChallenge();
  }
  return(
    <div className={styles.challengeBoxContainer}>
    {activeChallenge ? (
      <div className={styles.challengeActive}>
        <header>Ganhe {activeChallenge.amount} xp</header>
        <main>
          <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
          <strong>Exercite-se</strong>
          <p>{activeChallenge.description}</p>
        </main>
        <footer>
          <button
          type="button"
          className={styles.challengeFailedButton}
          onClick={challengeFailed}
          >
            Falhei
          </button>
          <button
          type="button"
          className={styles.challengeCompletedButton}
          >
            Completei
          </button>
        </footer>
      </div>
    ) : (
        <div className={styles.challengeNoActive}>
          <strong>Inicie um ciclo para receber desafios a serem completados</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level up"/>
            Complete-os e ganhe experiência e avance de leve.
          </p>
        </div>
    )}
    </div>
  )
}