import React, {Component} from 'react';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			registerName: '',
			registerEmail: '',
			registerPassword: '',
		}
	}

	onRegisterNameChange = (event) => {
		this.setState({registerName: event.target.value});
	}

	onRegisterEmailChange = (event) => {
		this.setState({registerEmail: event.target.value})
	}

	onRegisterPasswordChange = (event) => {
		this.setState({registerPassword: event.target.value});
	}

	onRegisterSubmit = () => {
		console.log(this.state);
		fetch('https://face-recognition-sze.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.registerName,
				email: this.state.registerEmail,
				password: this.state.registerPassword
			}),	
		})
		.then(resp => resp.json())
		.then(user => {
			if(user) {
				this.props.updateUser(user)
				this.props.onRouteChange('home');
			}
		});
	}

	render() {
		return (
			<main className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<div className="pa4 black-80">
			  		<div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					    	<legend className="f2 fw6 ph0 mh0">Register</legend>
					      	<div className="mt3">
					        	<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
					        	<input onChange={this.onRegisterNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
					      	</div>
					      	<div className="mt3">
					        	<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        	<input onChange={this.onRegisterEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
					      	</div>
					      	<div className="mv3">
					        	<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        	<input onChange={this.onRegisterPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
					      	</div>
					    </fieldset>
					    <div className="">
					    	<input onClick={this.onRegisterSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
					    </div>
					    <div className="lh-copy mt3">
					    	<p onClick={() => this.props.onRouteChange('signin')} className="pointer f6 link dim black db">SignIn</p>
					    </div>
				  	</div>
				</div>
			</main>
		);
	}
}

export default Register;