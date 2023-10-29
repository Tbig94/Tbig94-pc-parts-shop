const getAllProducts = () => {
  fetch('http://localhost:3000/api/v1/products', {
    mode: 'cors',
  }).then((response) => {
    return response.json();
  });
};

export default getAllProducts;
