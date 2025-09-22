import axiosInstance from './axiosInstance';

export function getAlltours (limit = 10, offset = 0)  {
    try {
        const response =  axiosInstance.get('/tours', {
            params: { limit, offset }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching tours:', error);
        throw error;
    }
};

export function GetAllToursDisponubles (){
    try {
        const response = axiosInstance.get('/tours/availability');
        return response.data;
    } catch (error) {
        console.error('Error fetching available tours:', error);
        throw error;
    }
};

export function setReservacion (reservationData) {
    try {
        const response =  axiosInstance.put('/tours/reserve', reservationData);
        return response.data;
    }
    catch (error) {
        console.error('Error making reservation:', error);
        throw error;
    }
};

