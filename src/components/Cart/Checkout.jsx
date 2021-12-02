import React, { useRef, useState } from 'react';

import styles from '../../assets/css/Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = props => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirmOrder({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    });
  };

  const controlClasses = {
    name: `${styles.control}${
      formInputsValidity.name ? '' : ' ' + styles.invalid
    }`,
    street: `${styles.control}${
      formInputsValidity.street ? '' : ' ' + styles.invalid
    }`,
    postal: `${styles.control}${
      formInputsValidity.postal ? '' : ' ' + styles.invalid
    }`,
    city: `${styles.control}${
      formInputsValidity.city ? '' : ' ' + styles.invalid
    }`,
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={controlClasses.name}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formInputsValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={controlClasses.street}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!formInputsValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={controlClasses.postal}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalInputRef} type='text' id='postal' />
        {!formInputsValidity.postal && <p>Please enter a valid postal code.</p>}
      </div>
      <div className={controlClasses.city}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formInputsValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
