import './HeaderCartButton.css';
import CartIcon from '../Cart/CartIcon'
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [isButtonAnimated, setIsButtonAnimated] = useState(false);

  const cartContext = useContext(CartContext);

  const cartItemsNumber = cartContext.items.reduce((currentValue, item) => {
    return currentValue + item.amount
  }, 0);

  const buttonClasses = `button ${isButtonAnimated ? 'bump' : null}`;

  useEffect(() => {
    if (cartContext.items === 0) {
      return;
    }
    setIsButtonAnimated(true);

    const timer = setTimeout(() => {
      setIsButtonAnimated(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    }
  }, [cartContext.items])

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className='icon'>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className='badge'>{cartItemsNumber}</span>
    </button>
  )
}
export default HeaderCartButton;