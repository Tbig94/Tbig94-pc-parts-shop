import { createSlice } from '@reduxjs/toolkit';

const items =
  localStorage.getItem('cartItems') !== null
    ? JSON.parse(localStorage.getItem('cartItems'))
    : '';

const initialState = {
  cart: items !== '' ? items : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      console.log(`addItem - state.cart: ${state.cart}`);
      const cartItem = state.cart.find((item) => item.id === action.payload.id);
      if (cartItem) {
        cartItem.quantity = cartItem.quantity + 1;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cart.map((cartItem) => cartItem))
      );
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);

      localStorage.setItem('cartItems', '');
    },
    increaseItemQuantity(state, action) {
      const cartItem = state.cart.find((item) => item.id === action.payload);
      cartItem.quantity = cartItem.quantity + 1;
      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cart.map((cartItem) => cartItem))
      );
    },
    decreaseItemQuantity(state, action) {
      const cartItem = state.cart.find((item) => item.id === action.payload);
      if (!cartItem) return;
      if (cartItem.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== cartItem.id);
        localStorage.setItem(
          'cartItems',
          JSON.stringify(state.cart.map((cartItem) => cartItem))
        );
      } else {
        cartItem.quantity = cartItem.quantity - 1;
        localStorage.setItem(
          'cartItems',
          JSON.stringify(state.cart.map((cartItem) => cartItem))
        );
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQuantity = (state) =>
  state.cart.cart != ''
    ? state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

export const getTotalCartPrice = (state) =>
  state.cart.cart != ''
    ? state.cart.cart.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
      )
    : 0;

export const getCart = (state) => state.cart.cart;

export const countElementsByFilter = (state, id) => {
  return state.cart.cart
    ? state.cart.cart.find((item) => item.id === id)?.quantity || 0
    : 0;
};
