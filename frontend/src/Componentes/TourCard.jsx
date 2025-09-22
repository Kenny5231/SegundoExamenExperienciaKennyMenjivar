/*
Cree un componente <TourCard /> que recibe en las props la información del tour 
y muestra nombre, descripción y un botón de “Ver disponibilidad”.

Al presionar el botón de “Ver disponibilidad” muestra los horarios disponibles,
 un checkbox para seleccionar el horario, y un input para que ingrese su nombre y el botón
  “Reservar”.
Esta acción levantará el método /tours/reserve.

*/
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import { setReservacion } from '../api/Rutas';
import axiosInstance from '../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { setTours } from '../Componentes/SlideTours';

const TourCard = ({ tour, onReserve }) => {
    const [showAvailability, setShowAvailability] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const handleReserveClick = () => {
        setShowAvailability(!showAvailability);
    }
    const handleScheduleChange = (e) => {
        setSelectedSchedule(e.target.value);
    } 
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleReservation = async () => {
        if (!selectedSchedule || !name) {
            alert('Please select a schedule and enter your name.');
            return;
        }
        const reservationData = {
            tourId: tour.id,
            schedule: selectedSchedule,
            name: name
        };
        try {
            const response = await setReservacion(reservationData);
            alert('Reservation successful!');
            onReserve(tour.id, selectedSchedule, name);
            // Optionally, refresh tours in Redux store
            const toursResponse = await axiosInstance.get('/tours');
            dispatch(setTours(toursResponse.data));
        }
        catch (error) {
            alert('Error making reservation. Please try again.');
        }
    };  
    return (
        <Card>
            <Card.Body>
                <Card.Title>{tour.name}</Card.Title>
                <Card.Text>{tour.description}</Card.Text>
                <Button variant="primary" onClick={handleReserveClick}>
                    {showAvailability ? 'Hide Availability' : 'View Availability'}
                </Button>
                {showAvailability && (
                    <div className="mt-3">
                        <div>
                            <label htmlFor={`schedule-${tour.id}`}>Select Schedule:</label>
                            <select id={`schedule-${tour.id}`} className="form-control" value={selectedSchedule} onChange={handleScheduleChange}>
                                <option value="">--Select--</option>
                                {tour.availability.map((schedule, index) => (
                                    <option key={index} value={schedule}>{schedule}</option>  
                                ))} 
                            </select>
                        </div>
                        <div className="mt-2">
                                
                            <label htmlFor={`name-${tour.id}`}>Your Name:</label>
                            <input type="text" id={`name-${tour.id}`} className="form-control" value={name} onChange={handleNameChange} />
                        </div>
                        <Button variant="success" className="mt-3" onClick={handleReservation}>Reserve</Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
}
export default TourCard;
