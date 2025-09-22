import { configureStore } from '@reduxjs/toolkit';

import SlideTours from '../src/Componentes/SlideTours';

const store = configureStore({
    reducer: {
        tours: SlideTours,
    },
});
export default store;
