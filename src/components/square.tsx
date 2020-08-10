import React, { useState } from 'react';
import '../App.css';
import { Button } from 'react-bootstrap';

interface SquareComponentProps {
    value: number;
    onClick: () => void;
    color: 'secondary' | 'success' | 'primary';
}

export const Square: React.FC<SquareComponentProps> = (props) => {

    return(
        <Button variant={props.color} className="square" onClick={props.onClick}>
            {props.value}
        </Button>
    )
}