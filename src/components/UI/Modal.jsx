import ReactDOM from "react-dom";
import "./Modal.css";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onHideCart}></div>
}

const ModalWindow = (props) => {
  return (<div className="modal">
    <div className="content">{props.children}</div>
  </div>
  )
}

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart} />, portalElement)}
      {ReactDOM.createPortal(<ModalWindow>{props.children}</ModalWindow>, portalElement)}
    </>
  )
}
export default Modal;