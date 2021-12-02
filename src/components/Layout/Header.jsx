import React from 'react';

import HeaderCartButton from './HeaderCartButton';
import bgImage from '../../assets/images/meals.jpg';

import styles from '../../assets/css/Header.module.css';

const Header = props => {
  return (
    <>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={styles['main-image']}>
        <img src={bgImage} alt='A Dining Table' />
      </div>
    </>
  );
};

export default Header;
