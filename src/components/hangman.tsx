import React, { useState, FormEvent } from 'react';
import { Button, Form, FormControl, Badge, Card } from 'react-bootstrap';

export interface HangmanComponentProps {
    p1Name: string;
    p2Name: string;
    setP1Score: () => void;
    setP2Score: () => void;
    score: number;
  }

export const HangmanComponent: React.FC<HangmanComponentProps> = (props) => {
    const [p1IsFirst, setP1IsFirst] = useState(true);
    const [word, setWord] = useState<string | undefined>(' ');
    const [spaces, setSpaces] = useState('');
    const [guess, setGuess] = useState(' ');
    const [lives, setLives] = useState(6);
    const [wrongGuesses, setWrongGuesses] = useState('');
    const [badgeVariant, setBadgeVariant] = useState<'primary' | 'warning' | 'danger'>('primary');
    const [status, setStatus] = useState('Click above to pick who goes first (click more than once to alternate)');
    
    const switchRoles = () => {
        setP1IsFirst(!p1IsFirst);
        const name = p1IsFirst ? props.p1Name : props.p2Name;
        setStatus(`${name}, choose a word `);
    }

    const determineLoser = () => {
        if(lives === 0) {
            return true;
        }
        return false;
    }
    const determineWinner = () => {
        if(spaces.indexOf('_') === -1 && spaces !== '') {
            return true;
        }
        return false;
    }

    let winner: boolean = determineWinner();
    let loser: boolean = determineLoser();
    
    const determineStatus = () => {
        const name = p1IsFirst ? props.p1Name : props.p2Name;
        if(winner) {
            setStatus(`That's correct, ${name} won! To play again, click here --> `);
            if(name === props.p1Name) {
                props.setP1Score();
            }else if(name === props.p2Name) {
                props.setP2Score();
            }
            console.log('here', name, props.score);
        }else if(loser) {
            setStatus(`No more guesses, ${name} lost... The word was '${word}'. To play again, click here --> `);
            if(name === props.p1Name) {
                props.setP2Score();
            }else if(name === props.p2Name) {
                props.setP1Score();
            }
        }
    }

    const renderBeginButton = () => {
        if(status.includes('choose')) {
            return <Button size='sm' className='button' onClick={pickWord} >Click to begin!</Button>;
        }
        return null;
    }

    const renderRestartButton = () => {
        if(status.includes('again')) {
            return <Button size='sm' onClick={startOver}>play again!</Button>;
        }
        return null;
    }

    const startOver = () => {
        setWord(' ');
        setSpaces('');
        setGuess(' ');
        setLives(6);
        setWrongGuesses('');
        setBadgeVariant('primary');
        const name = !p1IsFirst ? props.p1Name : props.p2Name;
        setStatus(`${name}, choose a word `);
    }

    const pickWord = () => {
        const w = prompt('Enter the word to be guessed')?.toUpperCase();
        setWord(w);
        const length = w?.length;
        const spaceArray = Array(length).fill('_');
        setSpaces(spaceArray.join(' '));
        const name = p1IsFirst ? props.p1Name : props.p2Name;
        setStatus(`${name}, guess a letter`);
    }

    const handleGuess = () => {
        if(word === ' ') {
            alert('Must enter a word to start game');
            return;
        }
        determineStatus();
        if(determineLoser() || determineWinner()) {
            return;
        }
        if(word !== undefined) {
            const wordArray = word.split('');
            const hasLetter: boolean = wordArray.includes(guess.toUpperCase());
            if(spaces.includes(guess) || wrongGuesses.includes(guess)) {
                alert('You already guessed this letter, try another one.');
                return;
            }
            if(hasLetter) {
                const newSpaces = spaces.split('').filter((a) => a != ' ');
                for(let i = 0; i < wordArray.length; i++) {
                    if(wordArray[i] == guess) {
                        newSpaces[i] = guess;
                    }
                }
                setSpaces(newSpaces.join(' '));
            }else {
                if(lives > 0) {
                    setLives(lives - 1);
                }else {
                    setLives(0);
                }
                changeBadgeVariant();
                setWrongGuesses(wrongGuesses + guess);
            }
        }
    }

    const changeBadgeVariant = () => {
        switch(lives) {
            case 6:
                setBadgeVariant('primary');
                break;
            case 5:
                setBadgeVariant('warning');
                break;
            case 4:
                setBadgeVariant('warning');
                break;
            case 3:
                setBadgeVariant('danger');
                break;
            case 2:
                setBadgeVariant('danger');
                break;
            case 1:
                setBadgeVariant('danger');
                break;
            case 0:
            setBadgeVariant('danger');
            break;
            default:
                setBadgeVariant('primary');
        }
    }

    const clearButton = () => {
        if(word === ' ') {
            return <Button onClick={switchRoles}>Choose First Player</Button>;
        }
    }

    const handleKeyPress = (event: any) => {
        if(event.which === 13) {
            event.preventDefault();
        }
    }
    
    return(
        <div>
            <h1>Hangman <span>{clearButton()}</span></h1>
            <hr/>
            <h4>{status}{renderRestartButton()}{renderBeginButton()}</h4>
            <h6>Attempts remaining <span><Badge pill variant={badgeVariant} >{lives}</Badge></span></h6>
            <br/>
            <Card id='spaces' body>{spaces}</Card>
            <br/>
            <h6>Enter guess here:</h6>
            <Form inline>
                <FormControl id='guessInput' onChange={(e) => setGuess(e.target.value.toUpperCase())} 
                type='text' placeholder='one letter at a time!' onKeyPress={handleKeyPress}>
                </FormControl>
                <Button className='button' onClick={handleGuess} variant='primary'>Submit</Button>
            </Form>
            <Card>
                <Card.Header>Wrong Guesses</Card.Header>
                <Card.Body>{wrongGuesses}</Card.Body>
            </Card>
            <br/>
            <br/>
            <Button variant='outline-danger' size='lg' onClick={startOver}>Clear game</Button>
        </div>
    )
}