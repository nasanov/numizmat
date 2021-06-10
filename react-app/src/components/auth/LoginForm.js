import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';
import { getCollections } from '../../store/collections';
import { getCoins } from '../../store/coins';

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPassHidden, setPassHidden] = useState(true);

	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async e => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data.errors) {
			setErrors(data.errors);
		}
		// temporary: to update users coins and collections after relogin
		dispatch(getCoins());
		dispatch(getCollections());
	};

	const updateEmail = e => {
		setEmail(e.target.value);
	};

	const updatePassword = e => {
		setPassword(e.target.value);
	};

	const demoLogin = async e => {
		e.preventDefault();
		await dispatch(login('demo@aa.io', 'password'));

		// temporary: to update demo users coins and collections after relogin
		dispatch(getCoins());
		dispatch(getCollections());
	};

	if (user) {
		return <Redirect to="/home" />;
	}

	return (
		<div className="login-container">
			<div className="loginWrap">
				<div className="switch-link-container">
					<h1 className="login-form-header">Login</h1>
					<span className="switchLinkName">New user?</span>
					<NavLink to="/sign-up" className="switchLink">
						Sign up
					</NavLink>
					<span className="switchLinkName">Go</span>
					<NavLink to="/" className="switchLink">
						Home
					</NavLink>
				</div>
				<form onSubmit={onLogin}>
					<div>
						{errors.map(error => (
							<div>{error}</div>
						))}
					</div>
					<div>
						<input
							name="email"
							className="login-input"
							type="text"
							placeholder="Email"
							value={email}
							required
							onChange={updateEmail}
						/>
					</div>
					<div>
						<input
							name="password"
							type={isPassHidden ? 'password' : 'text'}
							placeholder="Password"
							value={password}
							className="login-input"
							onChange={updatePassword}
						/>
						{isPassHidden ? (
							<i className="far fa-eye-slash hidePassword" onClick={e => setPassHidden(false)}></i>
						) : (
							<i className="far fa-eye hidePassword" onClick={e => setPassHidden(true)}></i>
						)}

						<button type="submit" className="login-btn">
							Login
						</button>
						<button onClick={demoLogin} className="demo-btn">
							Demo Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
