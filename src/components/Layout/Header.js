import './Header.css';
import sushiImg from '../../assets/sushi.jpg'
import React from 'react';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <React.Fragment>
      <header className='header'>
        <h1>Japanese Food</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className='main-image'>
        <img src={sushiImg} alt='sushi' />
      </div>
    </React.Fragment>
  )
}

export default Header;