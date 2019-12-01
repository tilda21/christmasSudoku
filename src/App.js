import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"; 
import './App.css';
import StartMenu from './components/StartMenu';
import GameOver from './components/GameOver';
import MakePuzzle from './components/sudoku';
import Board from './components/Board';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.state = {
      uncompletedPuzzle: [],
      completedPuzzle: [],
      gameovermessage: 'never give up'
    };
  }

  componentDidMount(){
    
  }
  
  handleClick(){
    const puzzle = MakePuzzle()
    console.log(puzzle)
    this.setState({uncompletedPuzzle: puzzle.uncompletedPuzzle, completedPuzzle: puzzle.completedPuzzle});
  }
  handleMessage(message){
    this.setState({gameovermessage: message })
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-title">
            <h1 className="App-title">Sudoku Game</h1>
            <h2 className="App-title2">It's christmas time</h2>
          </header>
          <Switch >
            
            <Route exact path="/" render={() => 
              <StartMenu 
                //handleDifficultyChange={this.handleDifficultyChange} 
                //difficulty={difficulty}
                handleClick={this.handleClick}
              />
            }/>

            <Route exact path="/board" render={() => 
              <Board MakePuzzle={this.state} handleMessage={this.handleMessage} />
            }/>

            <Route exact path="/gameover" render={() => 
              <GameOver gameovermessage={this.state.gameovermessage} />
            }/>
          </Switch>
    
          <footer className="App-footer">
            <p className="no-margin-bottom">Made by Matilde Ribeiro,</p>
            <p className="no-margin">as project for Wild Code School, Lisbon</p>
            <p className="no-margin">2019</p>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
 
}

export default App;


