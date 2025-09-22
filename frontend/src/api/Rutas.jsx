import axiosInstance from './axiosInstance';

const getListaLimitada = async ()=>{
    try {
        const response = await axiosInstance.get('getListaLimitada'); 
    }catch(error){
        return null;
    }
}

const getDisponibilidadDeRestauarantes = async (offset,limit)=>{
    try {
         if(limit=null){
            limit=10;
         }
         if(offset){
            offset=0;
         }
        const response = await axiosInstance.get('getDisponibilidadDeRestauarantes/${limit},offset'); 
    }catch(error){
        return null;
    }
}
const putRestaurantReserve = async(personName,scheduleTime,restaurantId)=>{
try{
    const response = await axiosInstance.put('putRestaurantReserve/${personName},scheduleTime,restaurantId')
}catch(error){
return null;
}
}
