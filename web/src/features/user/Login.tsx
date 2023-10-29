import { useState } from 'react';
import Button from '../../components/Button';
import './Login.css';
import { User } from './../../types/user';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateToken } from './../user/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!emailPattern.test(formData.email)) {
      setEmailError(true);
    }
    if (formData.password === null || formData.password.length < 8) {
      setPasswordError(true);
    }

    if (emailError || passwordError) {
      return;
    }

    if (emailError || passwordError) {
      return;
    }

    const user: User = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setFormData({
          email: '',
          password: '',
        });

        const resJson = await response.json();
        const token = resJson.data.token;
        dispatch(updateToken({ token, email: user.email }));

        navigate('/');
      } else {
        setLoginError(true);
      }
    } catch (err) {
      console.error('Network error', err);
    }
  };

  return (
    <div className="login-container">
      {loginError && <p className="login-form-error">Wrong credentials</p>}
      <form className="login-form">
        <div className="login-form-input">
          <label>Email address</label>
          <div>
            <input
              name="email"
              value={formData.email}
              placeholder="johndoe@email.com"
              onChange={handleInputChange}
              type="text"
              required
            ></input>
            {emailError && (
              <p className="login-form-error">Invalid email address</p>
            )}
          </div>
          <label>Password</label>
          <div>
            <input
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              required
            ></input>
            {passwordError && (
              <p className="login-form-error">Invalid password</p>
            )}
          </div>
        </div>
        <div className="login-form-buttons">
          <Link to="/signup">New member? Sign up</Link>
          <Button
            onClick={handleSignIn}
            text="Sign in"
            width={100}
            height={30}
            radiusLeft
            radiusRight
          ></Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
