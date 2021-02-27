import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

export function Profile(){
  const { level } = useContext(ChallengesContext);
  const { userAuth } = useContext(AuthContext);
  return(
    <div className={styles.profileContainer}>
      <img src={userAuth.avatar_url} alt={userAuth.name}/>
      <div>
        <strong>{userAuth.name}</strong>
        <p>
        <img src="icons/level.svg" alt="Level" />
        Level {level}
        </p>
      </div>
    </div>
  )
}