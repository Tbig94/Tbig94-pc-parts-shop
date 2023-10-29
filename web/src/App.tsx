import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './ui/Home';
import AppLayout from './ui/AppLayout';
import ProductList from './features/products/ProductList';
import Error from './ui/Error';
import Order from './features/order/Order';
import Cart from './features/cart/Cart';
import ProductDetails from './features/products/ProductDetails';
import Login from './features/user/Login';
import Signup from './features/user/Signup';

const router = createBrowserRouter([
  {
    element: <AppLayout></AppLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/products',
        element: <ProductList></ProductList>,
      },
      {
        path: '/order',
        element: <Order></Order>,
      },
      {
        path: '/cart',
        element: <Cart></Cart>,
      },
      {
        path: '/product/:id',
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/signup',
        element: <Signup></Signup>,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
