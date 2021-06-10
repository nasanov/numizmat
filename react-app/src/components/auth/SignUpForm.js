import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
	const [username, setUsername] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [country, setCountry] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async e => {
		e.preventDefault();
		if (password === repeatPassword) {
			await dispatch(signUp(username, firstname, lastname, country, email, password));
		}
	};

	const updateUsername = e => {
		setUsername(e.target.value);
	};

	const updateFirstname = e => {
		setFirstname(e.target.value);
	};

	const updateLastname = e => {
		setLastname(e.target.value);
	};

	const updateCountry = e => {
		setCountry(e.target.value);
	};

	const updateEmail = e => {
		setEmail(e.target.value);
	};

	const updatePassword = e => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = e => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/home" />;
	}

	return (
		<div className="signup-container">
			<div className="signupWrap">
				<div className="switch-link-container">
					<h1 className="signup-form-header">Signup</h1>
					<span className="switchLinkName">Already registered?</span>
					<NavLink to="/login" className="switchLink">
						Login
					</NavLink>
					<span className="switchLinkName">Go</span>
					<NavLink to="/" className="switchLink">
						Home
					</NavLink>
				</div>
				<form onSubmit={onSignUp}>
					<div>
						<input
							type="text"
							name="username"
							onChange={updateUsername}
							value={username}
							className="signup-input"
							placeholder="username"
							required
						></input>
					</div>
					<div>
						<input
							type="text"
							name="firstName"
							onChange={updateFirstname}
							value={firstname}
							className="signup-input"
							placeholder="first name"
							required
						></input>
					</div>
					<div>
						<input
							type="text"
							name="lastName"
							onChange={updateLastname}
							value={lastname}
							className="signup-input"
							placeholder="last name"
							required
						></input>
					</div>
					<div>
						<input
							type="text"
							name="country"
							onChange={updateCountry}
							value={country}
							className="signup-input"
							placeholder="country"
							required
						></input>
					</div>
					<div>
						<input
							type="text"
							name="email"
							onChange={updateEmail}
							value={email}
							className="signup-input"
							placeholder="e-mail"
							required
						></input>
					</div>
					<div>
						<input
							type="password"
							name="password"
							onChange={updatePassword}
							value={password}
							className="signup-input"
							placeholder="password"
							required
						></input>
					</div>
					<div>
						<input
							type="password"
							name="repeat_password"
							onChange={updateRepeatPassword}
							value={repeatPassword}
							required={true}
							className="signup-input"
							placeholder="repeat-password"
						></input>
					</div>
					<button type="submit" className="signup-btn">
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
