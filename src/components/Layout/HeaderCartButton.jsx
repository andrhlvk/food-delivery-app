import React, { useEffect, useState } from 'react';

import CartIcon from '../UI/CartIcon';

import styles from '../../assets/css/HeaderCartButton.module.css';
import { useCart } from '../../store/CartContext';

const HeaderCartButton = props => {
  const [btnIsAnimated, setBtnIsAnimated] = useState(false);
  const cartCtx = useCart();

  const totalCartItems = cartCtx.items.reduce(
    (total, item) => total + item.amount,
    0
  );

  useEffect(() => {
    if (cartCtx.items.length === 0) return;

    setBtnIsAnimated(true);

    const timer = setTimeout(() => {
      setBtnIsAnimated(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [cartCtx.items]);

  const btnClasses = btnIsAnimated
    ? `${styles.button} ${styles.bump}`
    : `${styles.button}`;

  return (
    <button onClick={props.onShowCart} className={btnClasses}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{totalCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
