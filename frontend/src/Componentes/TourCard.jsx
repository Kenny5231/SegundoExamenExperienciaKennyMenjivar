/*
Cree un componente <TourCard /> que recibe en las props la información del tour 
y muestra nombre, descripción y un botón de “Ver disponibilidad”.

Al presionar el botón de “Ver disponibilidad” muestra los horarios disponibles,
 un checkbox para seleccionar el horario, y un input para que ingrese su nombre y el botón
  “Reservar”.
Esta acción levantará el método /tours/reserve.

*/
import React, { useState } from 'react';

const TourCard = ({ tour, onReserve }) => {
    
    const [showAvailability, setShowAvailability] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [personName, setPersonName] = useState('');
    const [error, setError] = useState(null);

    const handleReserve = () => {
        if (!selectedSchedule || !personName) {
            setError('Please select a schedule and enter your name.');
            return;
        }
        setError(null);
        onReserve(tour.id, selectedSchedule, personName);
    };
    return (  
        <div className="card mb-3"> 
            <div className="card-body">
                <h5 className="card-title">{tour.name}</h5>
                <p className="card-text">{tour.description}</p>
                <button className="btn btn-primary" onClick={() => setShowAvailability(!showAvailability)}> 
                    {showAvailability ? 'Hide Availability' : 'View Availability'}
                </button>
                {showAvailability && (
                    <div className="mt-3">  
                        <h6>Available Schedules:</h6>
                        {tour.schedules.map((schedule) => (
                            <div className="form-check" key={schedule}>
                                <input
                                    className="form-check-input"
                                    type="radio"  
                                    name={`schedule-${tour.id}`}
                                    value={schedule}
                                    onChange={() => setSelectedSchedule(schedule)}
                                />
                                <label className="form-check-label">{schedule}</label>
                            </div>
                        ))}
                        <div className="mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                value={personName}  
                                onChange={(e) => setPersonName(e.target.value)}
                            />
                        </div>
                        {error && <div className="text-danger mt-2">{error}</div>}
                        <button className="btn btn-success mt-3" onClick={handleReserve}>Reserve</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TourCard;