import React from 'react';
import { Link } from "react-router-dom";
import './Button.css';
import './gameOver.css';
import rudolph from '../img/christmas-dog1.png';

class StartMenu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        puzzle: []
      };
      
    }
    handleOnClick = (e) => {
        this.props.handleClick();
        //console.log(e.target)
      };
     
    render() {
      console.log(this.state.puzzle);
      return (
        <div>
           <div className='christmasLights'></div>
           <div>
             <img src={rudolph} alt='rudolph' className='rudolph'/>
           </div>
           <Link to="/board"><button className='startButton' onClick={ this.handleOnClick }>Start Game</button></Link>
        </div>

      );
    }


}
export default StartMenu;
       