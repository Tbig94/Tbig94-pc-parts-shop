import { Outlet } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import './AppLayout.css';

const AppLayout = () => {
  return (
    <>
      {/* <Loader></Loader> */}
      <div className="app-layout">
        <Header></Header>

        <main className="main">
          <Outlet></Outlet>
        </main>

        <CartOverview></CartOverview>
      </div>
    </>
  );
};
export default AppLayout;
