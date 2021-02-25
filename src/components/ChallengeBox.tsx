import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
  const hasActiveChallenge = true;
  return(
    <div className={styles.challengeBoxContainer}>
    {hasActiveChallenge ? (
      <div className={styles.challengeActive}>
        <header>Ganhe 400 xp</header>
        <main>
          <img src="icons/body.svg" alt=""/>
          <strong>Exercite-se</strong>
          <p>É agora Will, bora queimar umas calorias. Faça por 2 minutos alongamento das mãos, para relaxar os músculos.</p>
        </main>
        <footer>
          <button
          type="button"
          className={styles.challengeFailedButton}
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