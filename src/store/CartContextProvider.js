import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingCartIndex = state.items.findIndex(item => {
      return item.id === action.item.id;
    });
    const existingCartItem = state.items[existingCartIndex];
    let updatedItem;
    let updatedItems;
    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    } else {
      updatedItem = {
        ...action.item,
      }
      updatedItems = state.items.concat(updatedItem);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if (action.type === 'REMOVE_ITEM') {
    const existingCartIndex = state.items.findIndex(item => {
      return item.id === action.id;
    });
    const existingCartItem = state.items[existingCartIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      let updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1
      };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }
  if (action.type === 'RESET') {
    const resetItems = state.items = [];
    const resetTotalAmount = state.totalAmount = 0;
    return {
      items: resetItems,
      totalAmount: resetTotalAmount,
    }
  }
  return defaultCartState;
}

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemHandler = (item) => {
    dispatchCartAction({
      type: 'ADD_ITEM',
      item: item
    });
  }
  const removeItemHandler = (id) => {
    dispatchCartAction({
      type: 'REMOVE_ITEM',
      id: id
    });
  }
  const resetHandler = () => {
    dispatchCartAction({
      type: 'RESET',
    });
  }
  const cartContex = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    resetCart: resetHandler,
  }

  return (
    <CartContext.Provider value={cartContex}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;