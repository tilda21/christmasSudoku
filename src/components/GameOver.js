import React from 'react';
import { Link } from "react-router-dom";
import './gameOver.css';


class GameOver extends React.Component {
     
    render() {
        console.log(this.props.gameovermessage);
        let message = this.props.gameovermessage;
        return (
            <div>
                <div className='christmasLights'></div>
                <h1 className='gameover'>Game Over</h1>
                <h2>{ message }</h2>
                <Link to="/"><button>Play Again</button></Link>
            </div>
            
        );
    }



}
export default GameOver;
       