import { Cart } from '../../types/cart';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  countElementsByFilter,
  decreaseItemQuantity,
} from '../cart/cartSlice';
import './ProductItem.css';
import { FC, Fragment } from 'react';
import { CartProductItemProps } from '../../types/cartProduct';
import Button from '../../components/Button';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';

const useStyles = createUseStyles({
  itemWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '20px',
    width: 50,
    height: 33,
    borderTop: '2px solid darkgray',
    borderBottom: '2px solid darkgray',
  },
});

const ProductItem: FC<CartProductItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const {
    id,
    name,
    quantity,
    minPrice,
    maxPrice,
    image,
    rating,
    description,
    numberOfClicks,
  } = product;

  const classes = useStyles();

  const currItemCount = useSelector((state) =>
    countElementsByFilter(state, id)
  );

  const handleAddToCart = () => {
    const newItem: Cart = {
      id,
      unitPrice: minPrice,
      name,
      quantity: 1,
    };

    dispatch(addItem(newItem));
  };

  const handleViewProductDetails = async () => {
    const currentProduct: Product = {
      id,
      name,
      image,
      rating,
      minPrice,
      maxPrice,
      description,
      numberOfClicks: numberOfClicks + 1,
    };

    try {
      await fetch(`http://localhost:3000/api/v1/products`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(currentProduct),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecreaseCount = () => {
    dispatch(decreaseItemQuantity(id));
  };

  return (
    <ul>
      <li className="product-item-container">
        <div className="product-item-element">
          <Link
            className="product-item-element-name"
            to={`/product/${product.id}`}
            onClick={handleViewProductDetails}
          >
            {product.name}
          </Link>
        </div>
        <p className="product-item-element-price">${product.minPrice}</p>
        <div className="product-item-element-img2">
          <img
            src={product.image}
            alt="PC image"
            className="product-item-element-img-img"
          ></img>
        </div>
        {minPrice !== 0 && (
          <div className="product-item-button-container">
            <Fragment>
              <Button
                name="addButton"
                text="Add"
                onClick={handleAddToCart}
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
        )}
      </li>
    </ul>
  );
};

export default ProductItem;
