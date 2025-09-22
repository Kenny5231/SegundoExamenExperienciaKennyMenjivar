/*

La lista de tours se almacena en redux, utilice redux toolkit:
Cree un Slice tours con 1 acción setTours que actualiza el valor inicial de [] 
a lo que devuelva la petición de /tours.

*/
import React from 'react';

const SlideTours = () => {
    const setTours = () => {
        console.log('Setting tours in Redux store');
        dispatch(setTours(tours));
    };
    return (
        <div>
            <h2>Redux Slice for Tours</h2>
            <button onClick={setTours}>Set Tours</button>
        </div>
    );
}
export { setTours };
export default SlideTours;
