import { ChangeEvent, FC, FormEvent, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCartPrice, getCart, clearCart } from './../cart/cartSlice.js';
import './Order.css';
import Button from '../../components/Button.js';
import { useNavigate } from 'react-router-dom';
import { Order as OrderType } from '../../types/order.ts';
import { Cart as CartType } from './../../types/cart.ts';

const Order: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    country: '',
    address: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalCartPrice: number = useSelector(getTotalCartPrice);
  const cart: CartType[] = useSelector(getCart);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cartData = cart
      .map((item) => `${item.id}-${item.quantity}`)
      .join(', ');

    const newOrder: OrderType = {
      customerName: formData.name,
      customerEmailAddress: formData.email,
      customerPhoneNumber: formData.phoneNumber,
      customerCountry: formData.country || 'Hungary',
      customerAddress: formData.address,
      productIds: cartData == '' ? 'asd' : cartData,
      totalPrice: totalCartPrice,
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          phoneNumber: '',
          country: '',
          address: '',
        });
        dispatch(clearCart());
        navigate('/');
      } else {
        console.error('Form submission failed');
      }
    } catch (err) {
      console.error('Network error', err);
    }
  };

  return (
    <Fragment>
      <p className="order-total-price">Total price: ${totalCartPrice}</p>
      <form className="order-form">
        <div className="order-input2">
          <label className="order-label">Name</label>
          <input
            name="name"
            value={formData.name}
            className="order-input"
            type="text"
            placeholder="John Doe"
            onChange={handleInputChange}
          />
        </div>

        <div className="order-input2">
          <label className="order-label">Email address</label>
          <input
            name="email"
            value={formData.email}
            className="order-input"
            type="email"
            placeholder="johndoe@email.com"
            onChange={handleInputChange}
          ></input>
        </div>

        <div className="order-input2">
          <label className="order-label">Phone number</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            className="order-input"
            type="text"
            placeholder="+36123456789"
            onChange={handleInputChange}
          ></input>
        </div>

        <div className="order-input2">
          <label className="order-label">Country</label>
          <select
            className="order-input"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="volvo">Hungary</option>
            <option value="saab">USA</option>
            <option value="fiat">Finland</option>
            <option value="audi">Germany</option>
          </select>
        </div>

        <div className="order-input2">
          <label className="order-label">Address</label>
          <input
            name="address"
            value={formData.address}
            className="order-input"
            type="text"
            placeholder="City, street, house number"
            onChange={handleInputChange}
          ></input>
        </div>
        <div className="order-submit-button">
          <Button
            name="SubmitButton"
            text="Submit order"
            onClick={handleSubmit}
            radiusRight
            radiusLeft
            width={130}
            height={35}
          ></Button>
        </div>
      </form>
    </Fragment>
  );
};

export default Order;
