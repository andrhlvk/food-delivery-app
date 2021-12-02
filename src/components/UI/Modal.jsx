import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../../assets/css/Modal.module.css';

const Backdrop = props => (
  <div onClick={props.onHideCart} className={styles.backdrop}></div>
);

const ModalOverlay = props => (
  <div className={styles.modal}>{props.children}</div>
);

const modalLanding = document.getElementById('overlays');

const Modal = props => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onHideCart={props.onHideCart} />,
        modalLanding
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        modalLanding
      )}
    </>
  );
};

export default Modal;
