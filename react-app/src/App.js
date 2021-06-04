import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import UI from './components/UI/UI';
import NavBar from './components/UI/NavBar/NavBar';
import Collection from './components/UI/Collection/Collection';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import CoinDetail from './components/UI/CoinDetail/CoinDetail';
import CollectionContent from './components/UI/CollectionContent/CollectionContent';
import { getCollections } from './store/collections';
import { authenticate } from './store/session';
import Splash from './components/UI/Splash/Splash';

function App() {
	// const user = useSelector(state => state.session.user);
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	useEffect(() => {
		dispatch(getCollections());
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact={true}>
					<Splash />
				</Route>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute>
				<ProtectedRoute path="/collections" exact={true}>
					<Collection />
				</ProtectedRoute>
				<ProtectedRoute path="/coins/:coinId" exact={true}>
					<CoinDetail />
				</ProtectedRoute>
				<ProtectedRoute path="/collections/:collectionId" exact={true}>
					<CollectionContent />
				</ProtectedRoute>
				<Route path="/home" exact={true}>
					<UI />
				</Route>
				<Route>
					<h1>404</h1>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
