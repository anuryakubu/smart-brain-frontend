import React from 'react'
import './Facerecognition.css'

const Facerecognition = ({ face, imageUrl }) => {
	
	return (
		<div className="center ma">
			<div className="absolute mt2">
				
				<img id="img" alt="face" src={imageUrl} width="500px" height="auto" />
				<div className="bounding-box" style={{ top: face.topRow, right: face.rightCol, bottom: face.bottomRow, left: face.leftCol }}></div>
			</div>
		</div>
		)
}

export default Facerecognition;