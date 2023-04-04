import './Header.css';
import sushiImg from '../../assets/sushi.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return (
    <>
      <header className='header'>
        <h1>Japanese Food</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className='main-image'>
        <img src={sushiImg} alt='sushi' />
      </div>
    </>
  )
}

export default Header;