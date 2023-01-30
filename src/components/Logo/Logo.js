import React from 'react'
import Tilt from 'react-parallax-tilt'
import brain from "./brain.png"

const Logo = () => {
	return (
		<div className="ma4 mt0">
			<Tilt>
		      <div className="pa3" style={{ height: '150px', width: '600px',backgroundColor: 'darkgreen', tiltMaxAngleX: 20, tiltMaxAngleY: 20 }}>
		        <h1> <img alt="logo" src={brain} style={{paddingTop: "5px"}}/> </h1>
		      </div>
	    	</Tilt>
		</div>
		)
}

export default Logo;