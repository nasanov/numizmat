// ################################################################ //
// ############################  TYPES  ########################### //
// ################################################################ //

const SET_COINS = 'set/COINS';
// ? const ADD_COIN = 'add/COIN';
// ? const EDIT_COIN = 'EDIT/COIN';
// ? const DELETE_COIN = 'DELETE/COIN';

// ################################################################## //
// ############################  ACTIONS  ########################### //
// ################################################################## //

const setCoins = coins => ({
	type: SET_COINS,
	coins,
});

// ? export const addCoin = coin => ({
// ? 	type: ADD_COIN,
// ? 	coin,
// ? })

// ? export const editCoin = coin => ({
// ? 	type: EDIT_COIN,
// ? 	coin
// ? })

// ? export const deleteCoin = coin => ({
// ? 	type: DELETE_COIN,
// ? 	coin,
// ? })

// ################################################################# //
// ############################  THUNKS  ########################### //
// ################################################################# //

export const getCoins = () => async dispatch => {
	const response = await fetch(`/api/coins/`);

	if (response.ok) {
		const data = await response.json();
		dispatch(setCoins(data.coins));
		return data;
	} else {
		throw response;
	}
};

// ? export const addNewCoin = coin_data => async dispatch => {
// ? 	const response = await fetch(`/api/coins`, {
// ? 		method: 'POST',
// ? 		body: JSON.stringify(coin_data),
// ? 		headers: {
// ? 			'Content-Type': 'application/json',
// ? 		},
// ? 	});
// ? 	if (response.ok) {
// ? 		const data = await response.json();
// ? 		dispatch(addCoin(data.coin));
// ? 		return coin;
// ? 	} else {
// ? 		throw response;
// ? 	}
// ? };

// ? export const modifyCoin = (coin_id, coin_data) => async dispatch => {
// ? 	const response = await fetch(`/api/coins/${coin_id}`, {
// ? 		method: 'PUT',
// ? 		body: JSON.stringify(coin_data),
// ? 		headers: {
// ? 			'Content-Type': 'application/json',
// ? 		},
// ? 	});
// ? 	if (response.ok) {
// ? 		const data = await response.json();
// ? 		dispatch(editCoin(data.coin));
// ? 		return coin;
// ? 	} else {
// ? 		throw response;
// ? 	}
// ? }

// ? export const removeCoin = coin_id => async dispatch => {
// ? 	const response = await fetch(`/api/coins/${coin_id}`, {
// ? 		method: 'DELETE',
// ? 	});
// ? 	if (response.ok) {
// ? 		const data = await response.json();
// ? 		dispatch(deleteCoin(data.coin));
// ? 	} else {
// ? 		throw response;
// ? 	}
// ? };

// ################################################################### //
// ############################  REDUCERS  ########################### //
// ################################################################### //

const initialState = {};

export default function coinReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_COINS:
			newState = { ...state, ...action.coins };
			return newState;
		// case ADD_COIN:
		// 	newState = { ...state }
		// 	newState[action.coin.id] = action.coin
		// 	return newState;
		// case EDIT_COIN:
		// 	newState = { ...state }
		// 	newState[action.coin.id] = action.coin
		// 	return newState;
		// case DELETE_COIN:
		// 	newState = { ...state }
		// 	delete newState[action.coin.id];
		// 	return newState;
		default:
			return state;
	}
}
