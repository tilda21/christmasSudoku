import React from 'react';
import Cell from './Cell';
import { Link } from "react-router-dom";
import './Board.css';

const Board = (props) => {
    console.log(props.handleMessage)
    
    let completedPuzzle = props.MakePuzzle.completedPuzzle;
    let uncompletedPuzzle = props.MakePuzzle.uncompletedPuzzle;

    let positions = uncompletedPuzzle.map((posi, i) => 
        posi.map((posj, j) =>        
            <Cell key={j} i={i} j={j} position={ posj } uncompletedPuzzle={ uncompletedPuzzle }/>
        )
    );


    const submitOnClick = () => {

        for(let i=0; i<uncompletedPuzzle.length; i++){
            for(let j=0; j<uncompletedPuzzle.length; j++){
                if(uncompletedPuzzle[i][j]==completedPuzzle[i][j]){
                    props.handleMessage('Congratulations you did it!!!');
                    //console.log('Congratulations')
                }else {
                    props.handleMessage('Try Again, giving up is not for you');
                    //console.log('Try again')
                }
            }   
        }
              
    }

    
    return (
        <div className="board">
            <div className="grid">
                {positions}
            </div>
            <Link to="/gameover"><button onClick={ submitOnClick }>Submit</button></Link>

        </div>
        
    );
}

export default Board;