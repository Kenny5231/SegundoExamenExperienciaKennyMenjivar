import { configureStore } from '@reduxjs/toolkit';
import restaurantsReducer from './components/SliceRestaurants';

const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
  },
});

export default store;