import React, { useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';
import { useCart } from '../../store/CartContext';
import { FIREBASE_URL } from '../../HIDDEN';

import styles from '../../assets/css/Cart.module.css';

const Cart = props => {
  const [checkoutIsShown, setCheckoutIsShown] = useState(false);
  const { isLoading, finishedLoading, sendRequest: sendOrder } = useHttp();

  const cartCtx = useCart();

  const hasItems = cartCtx.items.length > 0;
  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const removeCartItemHandler = id => {
    cartCtx.removeItem(id);
  };

  const addCartItemHandler = item => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setCheckoutIsShown(true);
  };

  const confirmOrderHandler = userData => {
    sendOrder({
      url: `${FIREBASE_URL}orders.json`,
      method: 'POST',
      body: {
        user: userData,
        order: { meals: cartCtx.items, total: totalAmount },
      },
    });
    cartCtx.clearCart();
  };

  const cartItems = cartCtx.items.map(item => (
    <CartItem
      item={item}
      key={item.id}
      id={item.id}
      name={item.name}
      price={+item.price}
      amount={item.amount}
      onRemoveItem={() => removeCartItemHandler(item.id)}
      onAddItem={() => addCartItemHandler(item)}
    />
  ));

  const modalActions = (
    <div className={styles.actions}>
      <button onClick={props.onHideCart} className={styles['button--alt']}>
        Close
      </button>
      <button onClick={orderHandler} className={styles.button}>
        Order
      </button>
    </div>
  );

  const cartModalContent = hasItems ? (
    <>
      <ul className={styles['cart-items']}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Total Amount:</span>
        <span>{`$${totalAmount}`}</span>
      </div>
      {checkoutIsShown && (
        <Checkout
          onCancel={props.onHideCart}
          onConfirmOrder={confirmOrderHandler}
        />
      )}
      {!checkoutIsShown && modalActions}
    </>
  ) : (
    <>
      <p className={styles['cart-text']}>Your cart is empty 😢</p>
      <div className={styles.actions}>
        <button onClick={props.onHideCart} className={styles['button--alt']}>
          Close
        </button>
      </div>
    </>
  );

  const isSubmittingModalContent = (
    <p className={styles['cart-text']}>
      <span className={styles.loading}>⚙️</span>Processing your order
      <span className={styles.loading}>⚙️</span>
    </p>
  );

  const didSubmitModalContent = (
    <>
      <p className={styles['cart-text']}>Succesfully sent your order 🥳</p>
      <div className={styles.actions}>
        <button onClick={props.onHideCart} className={styles['button']}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isLoading && !finishedLoading && cartModalContent}
      {isLoading && isSubmittingModalContent}
      {finishedLoading && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
