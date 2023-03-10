import React from 'react'
import "./Imageform.css"

const Imageform = ({ onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className="f3">Magic Rank</p>
			<div className="center">
				<div className="form center pa4 br3 shadow-5">
					<input className="w-70 f4 pa2 center" type="text" onChange={onInputChange}/>
					<button className="w-30 grow f4 link ph3 pv3 dib white bg-light-purple" onClick={onButtonSubmit}>Detect!</button>
				</div>
			</div>
		</div>
		)
}

export default Imageform;