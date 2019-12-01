import React from 'react';
import './Board.css';
import ContentEditable from 'react-contenteditable';

const Cell = (props) => {
    const Position = props.position;
    let uncompletedPuzzle = props.uncompletedPuzzle;
    const i = props.i;
    const j = props.j;
    const saveNumber = (e) => {
        console.log(e)
        console.log(e._dispatchInstances.memoizedProps.i)
        console.log(e._dispatchInstances.memoizedProps.j)
        console.log(uncompletedPuzzle)
        
        uncompletedPuzzle[i][j]=parseInt(e.target.value) ? parseInt(e.target.value) : 0
    }

    if(Position==""){
        return(
            <div className="box">
                <div className="number">
                    <ContentEditable
                    innerRef = {React.createRef()}
                    html= "<label>🎄</label>" // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    tagName='article' // Use a custom HTML tag (uses a div by default)
                    onChange={saveNumber}
                    i={props.i}
                    j={props.j}
                    />
                
                </div>
            </div>
        )
    }else{
        return(
            <div className="box">
                <div className="number">{ Position }</div>
            </div>
        )
    }
        

}
export default Cell;