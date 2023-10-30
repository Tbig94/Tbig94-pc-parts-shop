import { Outlet } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import './AppLayout.css';
import { FC, Fragment } from 'react';

const AppLayout: FC = () => {
  return (
    <Fragment>
      <div className="app-layout">
        <Header></Header>

        <main className="main">
          <Outlet></Outlet>
        </main>

        <CartOverview></CartOverview>
      </div>
    </Fragment>
  );
};
export default AppLayout;
