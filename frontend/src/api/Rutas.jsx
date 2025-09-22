import axiosInstance from './axiosInstance';

getAlltours = async (limit = 10, offset = 0) => {
    try {
        const response = await axiosInstance.get('/tours', {
            params: { limit, offset }
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching tours:', error);
        throw error;
    }
};

GetAllToursDisponubles = async () => {
    try {
        const response = await axiosInstance.get('/tours/availability');
        return response.data;
    } catch (error) {
        console.error('Error fetching available tours:', error);
        throw error;
    }
};

setReservacion = async (reservationData) => {
    try {
        const response = await axiosInstance.put('/tours/reserve', reservationData);
        return response.data;
    }
    catch (error) {
        console.error('Error making reservation:', error);
        throw error;
    }
};

export { getAlltours };
