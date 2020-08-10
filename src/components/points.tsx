import React from 'react';
import { Table } from 'react-bootstrap';

interface PointComponentProps {
    scoreP1: number;
    scoreP2: number;
    p1Name: string;
    p2Name: string;
    p1TicScore: number;
    p1HangScore: number;
    p2TicScore: number;
    p2HangScore: number;
}

export const PointsComponent: React.FC<PointComponentProps> = (props) => {
    return(
        <div>
            <div>I will keep track of players' points in each game</div>
            <Table striped bordered hover variant='light'>
                <thead>
                    <tr>
                        <th></th>
                        <th>{props.p1Name}</th>
                        <th>{props.p2Name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tic-Tac-Toe Points</td>
                        <td>{props.p1TicScore}</td>
                        <td>{props.p2TicScore}</td>
                    </tr>
                    <tr>
                        <td>Hangman Points</td>
                        <td>{props.p1HangScore}</td>
                        <td>{props.p2HangScore}</td>
                    </tr>
                    <tr>
                        <td>Total Points</td>
                        <td>{props.scoreP1}</td>
                        <td>{props.scoreP2}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}