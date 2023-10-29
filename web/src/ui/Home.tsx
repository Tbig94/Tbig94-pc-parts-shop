import './Home.css';
import ProductItem from './../features/products/ProductItem';
import { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchUserData = () => {
    fetch('http://localhost:3000/api/v1/products/top')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.data) {
          setProducts(data.data.products);
        }
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="home-container">
      <p className="home-container-p">
        Browse from thousands of PC components.
      </p>
      <p className="home-container-p">Build your dream PC.</p>
      <ul className="product-list-ul">
        {products.map((product) => (
          <ProductItem product={product} key={product.id}></ProductItem>
        ))}
      </ul>
    </div>
  );
};

export default Home;
