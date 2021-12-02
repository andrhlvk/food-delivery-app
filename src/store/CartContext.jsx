import React, { useContext, useReducer } from 'react';

const CartContext = React.createContext();

export const useCart = () => useContext(CartContext);

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  if (action.type === 'ADD_ITEM') {
    let updatedItems;

    const existingItemIndex = prevState.items.findIndex(
      item => item.id === action.item.id
    );

    const existingItem = prevState.items[existingItemIndex];

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };

      updatedItems = [...prevState.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = prevState.items.concat(action.item);
    }

    const newTotalAmount =
      prevState.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    let updatedItems;

    const existingItemIndex = prevState.items.findIndex(
      item => item.id === action.id
    );

    const existingItem = prevState.items[existingItemIndex];

    if (existingItem.amount === 1) {
      updatedItems = prevState.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };

      updatedItems = [...prevState.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    const newTotalAmount = prevState.totalAmount - existingItem.price;

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }

  if (action.type === 'CLEAR_CART') {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = item => {
    dispatchCartAction({ type: 'ADD_ITEM', item: item });
  };

  const removeItemHandler = id => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
  };

  const clearCart = () => {
    dispatchCartAction({ type: 'CLEAR_CART' });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
