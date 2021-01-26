import React from 'react'
const persona = (props) => {
    return (
        <div className="form-group">
            <label htmlFor="sel1">Select From List:</label>
            <select className="form-control" id="sel1" onChange={props.changeHandler}>
                {props.characters.map(character => <option key={character.value} value={character.value}>{character.display}</option>)}
            </select>
        </div>
    )
}
export default persona;