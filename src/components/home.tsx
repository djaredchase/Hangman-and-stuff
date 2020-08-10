import React, { useState } from 'react';
import '../App.css';
import { Button, Form, Modal } from 'react-bootstrap';

interface HomeComponentProps {
    p1Name: string;
    p2Name: string;
    setP1Name: (name: string) => void;
    setP2Name: (name: string) => void;
}

export const HomeComponent: React.FC<HomeComponentProps> = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const handleModalShow = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);

    return(
        <div>
            <div>
                <h1>Home Page</h1>
                <p>Not much to show here right now... Go play a game</p>
                <h3>Click here to set player names</h3>
                <Button onClick={handleModalShow}>Set names</Button>
            </div>

            <Modal show={modalShow} onHide={handleModalClose} backdrop='static' keyboard={false} >
                <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Player 1 name</Form.Label>
                        <Form.Control placeholder='enter name' onChange={(e) => props.setP1Name(e.target.value)} />
                        <br/>
                        <Form.Label>Player 2 name</Form.Label>
                        <Form.Control placeholder='enter name' onChange={(e) => props.setP2Name(e.target.value)} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleModalClose}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}