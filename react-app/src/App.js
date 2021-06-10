import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// ################################################################## //
// #########################  COMPONENTS  ########################### //
// ################################################################## //

import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UI from './components/UI/UI';
import Splash from './components/UI/Splash/Splash';
import Collection from './components/UI/Collection/Collection';
import CollectionContent from './components/UI/CollectionContent/CollectionContent';
import CoinDetail from './components/UI/CoinDetail/CoinDetail';
// import UsersList from './components/UsersList';
// import User from './components/User';
import PageNotFound from './components/auth/PageNotFound';
// import NavBar from './components/UI/NavBar/NavBar';

// ################################################################## //
// ############################  STORES  ############################ //
// ################################################################## //

import { authenticate } from './store/session';
// import { getCollections } from './store/collections';
// import { getCoins } from './store/coins';
// import { getCategories } from './store/categories';

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

	// useEffect(() => {
	// 	dispatch(getCoins());
	// }, [dispatch]);

	// useEffect(() => {
	// 	dispatch(getCollections());
	// }, [dispatch]);

	// useEffect(() => {
	// 	dispatch(getCategories());
	// }, [dispatch]);

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
				{/* <ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute> */}
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
					<PageNotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
