import Modal from '../UI/Modal';
import './Cart.css';
import { useState, useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [isOrder, setIsOrder] = useState(false);
  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;


  const addCartItemHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 })
  }
  const removeCartItemHandler = (id) => {
    cartContext.removeItem(id);
  }
  const resetCartItemHandler = () => {
    setIsOrder(!isOrder);
    cartContext.resetCart();
    setTimeout(() => {
      props.onHideCart()
    }, 3000);
  }


  const cartItems = (
    <ul className='cart-items'>
      {cartContext.items.map(item => (
        <CartItem
          key={item.id}
          price={item.price}
          amount={item.amount}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className='successfully'>
        {isOrder
          ? (<div>Order completed successfully</div>)
          : (<div className='total'>
            <span>Total</span>
            <span>{totalAmount}</span>
          </div>)
        }
        <div className='actions'>
          <button className='button--alt' onClick={props.onHideCart}>Close</button>
          {hasItems && <button className='button' onClick={resetCartItemHandler}>Order</button>}
        </div>
      </div>
    </Modal>
  )
}

export default Cart;