import React from 'react';
import {Link} from 'react-router-dom';
import styles from './landing.module.css';
import imglandp from '../../assets/landing.png';


function Landing() {
  return (
    <div className={styles.background}>
      <div className={styles.text}>
        <h1>Upgrade your Home Office </h1>
        <h1>With the best Laptops for Productivity in 2023 </h1>
      <Link to="/home">
      <button className={styles.button2}>Shop now</button>
      </Link>
      </div>
      <div className={styles.image}>
        <img src={imglandp} alt="landing" />
      </div>
    </div>
  );
}

export default Landing;