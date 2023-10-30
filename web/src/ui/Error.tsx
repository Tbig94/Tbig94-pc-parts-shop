import { FC, Fragment } from 'react';
import './Error.css';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';

const Error: FC = () => {
  return (
    <Fragment>
      <Header></Header>
      <div className="error-container">
        <p className="error-container-p">Something went wrong 😕</p>
      </div>
      <CartOverview></CartOverview>
    </Fragment>
  );
};

export default Error;
