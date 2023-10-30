import { FC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from './cartSlice';
import { Cart as CartType } from '../../types/cart';
import { useNavigate } from 'react-router-dom';
import { clearCart } from './cartSlice';
import './Cart.css';
import Button from '../../components/Button';

const Cart: FC = () => {
  const dispatch = useDispatch();
  const cartItems: CartType[] = useSelector(getCart);
  const navigate = useNavigate();

  const handleClearCart = () => {
    dispatch(clearCart());

    navigate('/products');
  };

  const handleOrderNow = () => {
    navigate('/order');
  };

  return (
    <Fragment>
      {!cartItems.length ? (
        <>
          <div className="cart-container-empty">
            <p>Cart is empty.</p>
          </div>
        </>
      ) : (
        <div className="cart-container">
          <ul className="cart-result-list">
            {cartItems.map((cartItem) => (
              <li key={cartItem.id} className="cart-result-item">
                <p className="cart-result-item-quantity">
                  ({cartItem.quantity})
                </p>
                <p className="cart-result-item-name">{cartItem.name}</p>
                <p className="cart-result-item-price">
                  ${cartItem.unitPrice * cartItem.quantity}
                </p>
              </li>
            ))}
          </ul>
          <div className="cart-actions">
            <Button
              name="SubmitButton"
              text="Order now"
              onClick={handleOrderNow}
              radiusRight
              radiusLeft
              width={130}
              height={35}
            ></Button>
            <button onClick={handleClearCart} className="cart-actions-clear">
              Clear cart
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
