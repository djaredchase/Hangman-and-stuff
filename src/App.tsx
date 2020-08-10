import React, { useState } from 'react';
//import { Game } from './components/game';
import './App.css';
import { Board } from './components/board';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomeComponent } from './components/home';
import { NavbarComponent } from './components/navbar';
import { PointsComponent } from './components/points';
import { HangmanComponent } from './components/hangman';

function App() {
  const [p1Name, setP1name] = useState('P1');
  const [p2Name, setP2Name] = useState('P2');
  const [p1TicScore, setP1TicScore] = useState(0);
  const [p2TicScore, setP2TicScore] = useState(0);
  const [p1HangScore, setP1HangScore] = useState(0);
  const [p2HangScore, setP2HangScore] = useState(0)
  const [totalScoreP1, setTotalScoreP1] = useState(p1TicScore + p1HangScore);
  const [totalScoreP2, setTotalScoreP2] = useState(p2TicScore + p2HangScore);

  const handleP1NameSet = (name: string) => {
    setP1name(name);
  }
  const handleP2NameSet = (name: string) => {
    setP2Name(name);
  }

  //These are the functions for setting win count in game components
  //Now have to set up game components to display names in their statuses
  //Then set up game components to call the correct function when a certain player wins
  const p1HandleTicWin = () => {
    setP1TicScore(p1TicScore + 1);
    setTotalScoreP1(totalScoreP1 + 1);
  }
  const p1HandleHangWin = () => {
    setP1HangScore(p1HangScore + 1);
    setTotalScoreP1(totalScoreP1 + 1);
  }

  const p2HandleTicWin = () => {
    setP2TicScore(p2TicScore + 1);
    setTotalScoreP2(totalScoreP2 + 1);
  }
  const p2HandleHangWin = () => {
    setP2HangScore(p2HangScore + 1);
    setTotalScoreP2(totalScoreP2 + 1);
  }

  return (
    <Router>
      <NavbarComponent p1Name={p1Name} p2Name={p2Name} scoreP1={totalScoreP1} scoreP2={totalScoreP2}/>
      <Switch>
        <Route exact path='/'>
          <HomeComponent p1Name={p1Name} setP1Name={handleP1NameSet} p2Name={p2Name} setP2Name={handleP2NameSet}/>
        </Route>
        <Route exact path='/tic-tac-toe'>
          <Board p1Name={p1Name} p2Name={p2Name} setP1Score={p1HandleTicWin} setP2Score={p2HandleTicWin}/>
        </Route>
        <Route exact path='/points'>
          <PointsComponent p1Name={p1Name} p2Name={p2Name} scoreP1={totalScoreP1} scoreP2={totalScoreP2}
          p1HangScore={p1HangScore} p1TicScore={p1TicScore} p2HangScore={p2HangScore} p2TicScore={p2TicScore}/>
        </Route>
        <Route exact path='/hangman'>
          <HangmanComponent score={p2HangScore} p1Name={p1Name} p2Name={p2Name} setP1Score={p1HandleHangWin} setP2Score={p2HandleHangWin}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
