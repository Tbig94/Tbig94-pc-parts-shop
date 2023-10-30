import { FC, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, getEmail, signOutUser } from './../features/user/userSlice';
import Button from '../components/Button.js';

const Header: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token: string = useSelector(getToken);
  const email: string = useSelector(getEmail);

  const handleSignOut = async () => {
    dispatch(signOutUser(''));
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <Fragment>
      <div className="navbar">
        <Link className="title" to="/">
          PC parts shop
        </Link>
        <div className="menu">
          <Link to="/products" className="navLink">
            Products
          </Link>
        </div>
        {token && email ? (
          <div className="header-user-data">
            <div className="welcome">{email}</div>
            <Button
              onClick={handleSignOut}
              width={100}
              height={30}
              radiusLeft
              radiusRight
              text="Sign out"
            ></Button>
          </div>
        ) : (
          <Button
            onClick={handleSignIn}
            width={100}
            height={30}
            radiusLeft
            radiusRight
            text="Sign in"
          ></Button>
        )}
      </div>
    </Fragment>
  );
};
export default Header;
