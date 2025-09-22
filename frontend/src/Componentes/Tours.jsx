import React, { useEffect, useState } from 'react';
import axiosIntance from '../api/axiosInstance';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TourCard from './TourCard';
const Tours = () => {
    
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const toursPerPage = 5;
    const offset = (currentPage - 1) * toursPerPage;
    const totalPages = Math.ceil(tours.length / toursPerPage);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await axiosIntance.get('/tours');
                setTours(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching tours');
                setLoading(false);
            }
        };
        fetchTours();
    }
    , []);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };      
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }   
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <Container>
            <Row className="my-7">  
                <Col>
                    <h2 className="text-center">By Kenny Menjivar </h2>
                </Col>
                <Col>
                    <h2 className="text-center">Available Tours</h2>
                </Col>
            </Row>
            <Row>
                {tours.slice(offset, offset + toursPerPage).map((tour) => (
                    <Col key={tour.id} md={4} className="mb-4">
                        <TourCard tour={tour} onReserve={(tourId, schedule, name) => {
                            console.log(`Reserving tour ${tourId} for ${name} at ${schedule}`);
                        }} />
                    </Col>
                ))}
            </Row>
            <Row className="my-4">
                <Col className="d-flex justify-content-between">
                    <Button variant="primary" onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <Button variant="primary" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
export default Tours;





                
