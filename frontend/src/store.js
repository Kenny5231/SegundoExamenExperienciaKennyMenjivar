import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    app: appReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;