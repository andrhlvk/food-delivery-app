import React from 'react';

import styles from '../../assets/css/Card.module.css';

const Card = props => {
  return (
    <div
      className={
        props.className ? `${props.className} ${styles.card}` : `${styles.card}`
      }
    >
      {props.children}
    </div>
  );
};

export default Card;
