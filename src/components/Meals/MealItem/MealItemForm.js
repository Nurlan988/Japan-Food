import './MealItemForm.css';
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);

  const amountInputRef = useRef(0);

  const submitHandler = (event) => {
    event.preventDefault();

    const inputAmount = amountInputRef.current.value;
    if (inputAmount.trim().length === 0 || +inputAmount < 1 || +inputAmount > 10) {
      setIsAmountValid(false);
      return;
    }
    setIsAmountValid(true);
    props.onAddToCart(+inputAmount);
    amountInputRef.current.value = 0
  }

  return (
    <form className='form' onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: props.id,
          type: 'number',
          min: '0',
          step: '1',
          defaultValue: '0'
        }}

      />
      <button>Add</button>
      {!isAmountValid && <p>Enter from 1 to 10</p>}
    </form>
  )
}
export default MealItemForm;