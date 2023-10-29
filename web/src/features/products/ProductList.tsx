import ProductItem from './ProductItem';
import './ProductList.css';
import { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

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
    const fetchPosts = async () => {
      fetchUserData();
    };

    fetchPosts();
  }, []);

  return (
    <div className="products-list">
      <ul className="product-list-ul">
        {products.map((product) => (
          <ProductItem product={product} key={product.id}></ProductItem>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
