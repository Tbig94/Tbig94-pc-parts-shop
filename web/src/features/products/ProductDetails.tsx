import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { Product } from '../../types/cartProduct';
import './ProductDetails.css';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  countElementsByFilter,
} from '../cart/cartSlice';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 33,
    borderTop: '2px solid darkgray',
    borderBottom: '2px solid darkgray',
  },
});

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const { id } = useParams();
  const classes = useStyles();

  let currItemCount = useSelector((state) => countElementsByFilter(state, id));

  const fetchUserData = () => {
    fetch('http://localhost:3000/api/v1/products')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data.data.products);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const currentProduct = products.find((dataEl) => dataEl.id === id);

  function handleIncreaseCount() {
    dispatch(increaseItemQuantity(id));
  }

  function handleDecreaseCount() {
    dispatch(decreaseItemQuantity(id));
  }

  return (
    <>
      {currentProduct && (
        <div className="product-details-container">
          <img
            src={currentProduct.image}
            alt="PC image"
            className="product-item-element-img"
          ></img>
          <div className="product-details-info">
            <p className="product-details-name">{currentProduct.name}</p>
            <p className="product-details-description">
              {currentProduct.description}
            </p>
            <p className="product-details-price">${currentProduct.minPrice}</p>
            <div className="product-details-button-container">
              <Fragment>
                <Button
                  name="addButton"
                  text="Add"
                  onClick={handleIncreaseCount}
                  iconName="ADD"
                  radiusLeft
                />
                <div className={classes.itemWrapper}>{currItemCount}</div>
                <Button
                  name="RemoveButton"
                  text="Remove"
                  onClick={handleDecreaseCount}
                  iconName="REMOVE"
                  radiusRight
                />
              </Fragment>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
