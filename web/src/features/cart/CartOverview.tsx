import { useSelector } from 'react-redux';
import './CartOverview.css';
import { getTotalCartQuantity, getTotalCartPrice } from './cartSlice';
import { Link } from 'react-router-dom';

const CartOverview = () => {
  const totalCartItems: number = useSelector(getTotalCartQuantity);
  const totalCartPrice: number = useSelector(getTotalCartPrice);

  return (
    <div className="cartInfo">
      {totalCartItems ? (
        <>
          <p className="cartInfoPara">Items in cart: {totalCartItems}</p>
          <p className="cartInfoPara">Total price: ${totalCartPrice}</p>
          <Link to="/cart" className="to-cart-link">
            View cart &rarr;
          </Link>
        </>
      ) : (
        <p className="cartInfoPara">No items in the cart yet.</p>
      )}
    </div>
  );
};

export default CartOverview;
