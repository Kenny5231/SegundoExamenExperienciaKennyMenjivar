const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');  
//Prueba
router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Registro de usuario
router.post('/register', async (req, res) => {
    res.json({ message: 'User registration endpoint' });
});



/*
Tipo

Ruta

Parámetros

Descripción

GET

/tours

limit, offset

Devuelve una lista de tours limitada por el limit y offset.Ambos parámetros 
tienen un valor por defecto:

Limit 10

Offset 0

GET

/tours/availability

Sin parámetros

Devuelve la disponibilidad de los tours en base a la fecha actual, solamente de fechas futuras.Tampoco devuelve las horas que ya han sido reservadas.

PUT

/tours/reserve

- personName

- scheduleTime

- tourId

Endpoint para reservar un tour a una hora específica. Setea en true la columna reserved. Actualiza la columna reservedBy con el personName.
*/

router.get('/tours', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    try {
        const result = await pool.query('SELECT * FROM tourApp.tours LIMIT $1 OFFSET $2', [limit, offset]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error Cargando tours:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/tours/availability', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT ts.id, ts.tour_id, ts.schedule_time, ts.seats_available, t.name AS tour_name
            FROM tourApp.tour_schedules ts
            JOIN tourApp.tours t ON ts.tour_id = t.id
            WHERE ts.schedule_time > NOW() AND ts.seats_available > 0
            ORDER BY ts.schedule_time ASC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error Cargando tours disponibles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/tours/reserve', async (req, res) => {
    const { personName, scheduleTime, tourId, seatsReserved } = req.body;
    if (!personName || !scheduleTime || !tourId || !seatsReserved) {
        return res.status(400).json({ error: 'Ingrese los campos faltantes porfavor.' });
    }
    try {
        await pool.query('BEGIN');

        const scheduleResult = await pool.query(
            'SELECT * FROM tourApp.tour_schedules WHERE tour_id = $1 AND schedule_time = $2 FOR UPDATE',
            [tourId, scheduleTime]
        );
        if (scheduleResult.rows.length === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json({ error: 'Tour schedule not found' });
        }   
        const schedule = scheduleResult.rows[0];
        if (schedule.seats_available < seatsReserved) {
            await pool.query('ROLLBACK');
            return res.status(400).json({ error: 'Not enough seats available' });
        }
        const newSeatsAvailable = schedule.seats_available - seatsReserved;
        await pool.query(
            'UPDATE tourApp.tour_schedules SET seats_available = $1 WHERE id = $2',
            [newSeatsAvailable, schedule.id]
        );

        await pool.query(
            'INSERT INTO tourApp.reservations (tour_schedule_id, person_name, seats_reserved) VALUES ($1, $2, $3)',
            [schedule.id, personName, seatsReserved]
        );

        await pool.query('COMMIT');
        res.json({ message: 'Reservacion completada.' });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error making reservation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

