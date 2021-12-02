import React from 'react';

import styles from '../../../assets/css/MealItem.module.css';
import { useCart } from '../../../store/CartContext';
import MealItemForm from './MealItemForm';

const MealItem = props => {
  const cartCtx = useCart();
  const price = props.price.toFixed(2);

  const addToCartHandler = amount => {
    cartCtx.addItem({
      name: props.name,
      price: price,
      id: props.id,
      amount: amount,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={styles.description}>{props.description}</p>
        <div className={styles.price}>{`$${price}`}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
