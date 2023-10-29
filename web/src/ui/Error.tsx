import AppLayout from './AppLayout';
import './Error.css';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';

const Error = () => {
  return (
    <>
      <Header></Header>
      <div className="error-container">
        <p className="error-container-p">Something went wrong 😕</p>
      </div>
      <CartOverview></CartOverview>
    </>
  );
};

export default Error;
