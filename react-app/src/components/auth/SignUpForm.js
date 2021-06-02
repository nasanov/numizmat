import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

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
		return <Redirect to="/" />;
	}

	return (
		<form onSubmit={onSignUp}>
			<div>
				<label>User Name</label>
				<input type="text" name="username" onChange={updateUsername} value={username}></input>
			</div>
			<div>
				<label>First Name</label>
				<input type="text" name="firstName" onChange={updateFirstname} value={firstname}></input>
			</div>
			<div>
				<label>Last Name</label>
				<input type="text" name="lastName" onChange={updateLastname} value={lastname}></input>
			</div>
			<div>
				<label>Country</label>
				<input type="text" name="country" onChange={updateCountry} value={country}></input>
			</div>
			<div>
				<label>Email</label>
				<input type="text" name="email" onChange={updateEmail} value={email}></input>
			</div>
			<div>
				<label>Password</label>
				<input type="password" name="password" onChange={updatePassword} value={password}></input>
			</div>
			<div>
				<label>Repeat Password</label>
				<input
					type="password"
					name="repeat_password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
				></input>
			</div>
			<button type="submit">Sign Up</button>
		</form>
	);
};

export default SignUpForm;
