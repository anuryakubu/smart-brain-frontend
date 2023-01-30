import React from 'react'


class Signin extends React.Component {

constructor(props) {
	super(props);
	this.state = {
		signinEmail: "",
		signinPassword: ""
	}
}

onEmailChange = (event) => {
	this.setState({signinEmail: event.target.value})
		
}

onPasswordChange = (event) => {
	this.setState({signinPassword: event.target.value})
	
		
}
	

onSubmitSignin = (event) => {
	
	fetch('http://localhost:3000/signin', {
		method: "POST",
		body: JSON.stringify({
			email: this.state.signinEmail,
			password: this.state.signinPassword
		}),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => {
		console.log(response)
		return response.json()
	}).then(data => {
		console.log(data)
		if (data.id) {
			this.props.loadUser(data)
			this.props.onRouteChange('home')
		}
	}
		)

	event.preventDefault()
	
	
}

render () {
	return (
	<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
		<main className="pa4 black-80">
			<form className="measure">
				<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				<legend className="f1 fw6 ph0 mh0">Sign In</legend>
				<div className="mt3">
					<label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
					<input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email" />
				</div>
				<div className="mv3">
					<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					<input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
				</div>
				
				</fieldset>
				<div className="">
				<input onClick={this.onSubmitSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
				</div>
				<div className="lh-copy mt3">
				<p onClick={ () => this.props.onRouteChange('register') } className="f6 link dim black db pointer">Register</p>
				</div>
			</form>
		</main>
	</article>

		)
	}
}

export default Signin;