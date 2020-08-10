import React from 'react';
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

export interface NavbarComponentProps {
    scoreP1: number;
    scoreP2: number;
    p1Name: string;
    p2Name: string;
}

export const NavbarComponent: React.FC<NavbarComponentProps> = (props) => {
    return(
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand as={Link} to='/' >Home</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to='/tic-tac-toe'>Tic-Tac-Toe</Nav.Link>
                <Nav.Link as={Link} to='/hangman'>Hangman</Nav.Link>
                <Nav.Link as={Link} to='/points'>Point Breakdown</Nav.Link>
            </Nav>
            <Nav.Link id='score1' disabled >{props.p1Name}: <strong>{props.scoreP1}</strong></Nav.Link>
            <Nav.Link id='score2' disabled >{props.p2Name}: <strong>{props.scoreP2}</strong></Nav.Link>
        </Navbar>
    )
}