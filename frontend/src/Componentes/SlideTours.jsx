/*

La lista de tours se almacena en redux, utilice redux toolkit:
Cree un Slice tours con 1 acción setTours que actualiza el valor inicial de [] 
a lo que devuelva la petición de /tours.

*/
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTours } from '../store';
import axiosInstance from '../api/axiosInstance';
import { getAlltours } from '../api/Rutas';


const SlideTours = () => {
    const dispatch = useDispatch();
    const tours = useSelector((state) => state.tours);
    const setTours = () => {
        console.log('Setting tours in Redux store');
        dispatch(setTours(tours));
    };
}

export default SlideTours;
