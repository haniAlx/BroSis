import React from 'react'

function Checkbox(props){
    return (
        <input type="checkbox" name="" id={props.id} checked={props.checked} value={props.value} 
            onChange={(e) => props.handleCheck(e.target.id, e.target.checked)}
            /> 
        ) 

}
export default Checkbox 

