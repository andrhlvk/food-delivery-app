import React, { useRef } from 'react';

import Input from '../../UI/Input';

import styles from '../../../assets/css/MealItemForm.module.css';

const MealItemForm = props => {
  const amountInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    props.onAddToCart(+amountInputRef.current.value);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          type: 'number',
          min: '1',
          max: '10',
          step: '1',
          defaultValue: '1',
          id: props.id,
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
