// ################################################################ //
// ############################  TYPES  ########################### //
// ################################################################ //

const SET_COINS = 'set/COINS';
const ADD_COIN = 'add/COIN';
// ? const EDIT_COIN = 'edit/COIN';
// ? const DELETE_COIN = 'delete/COIN';

// ################################################################## //
// ############################  ACTIONS  ########################### //
// ################################################################## //

const setCoins = coins => ({
	type: SET_COINS,
	coins,
});

export const addCoin = coin => ({
	type: ADD_COIN,
	coin,
});

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

export const addNewCoin = coin_data => async dispatch => {

	const formData = new FormData();
	formData.append('composition', coin_data['composition']);
	formData.append('country', coin_data['country']);
	formData.append('diameter', coin_data['diameter']);
	formData.append('isCollectible', coin_data['isCollectible']);
	formData.append('mintage', coin_data['mintage']);
	formData.append('name', coin_data['name']);
	formData.append('obversePhoto', coin_data['obversePhoto']);
	formData.append('orientation', coin_data['orientation']);
	formData.append('reversePhoto', coin_data['reversePhoto']);
	formData.append('series', coin_data['series']);
	formData.append('shape', coin_data['shape']);
	formData.append('thickness', coin_data['thickness']);
	formData.append('value', coin_data['value']);
	formData.append('weight', coin_data['weight']);
	formData.append('year', coin_data['year']);
	console.log(formData);

	const response = await fetch(`/api/coins/`, {
		method: 'POST',
		body: formData,
		// body: JSON.stringify(coin_data),
		// headers: {
			// 'Content-Type': 'application/json',
		// },
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(addCoin(data.coin));
		return data.coin;
	} else {
		throw response;
	}
};

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
		case ADD_COIN:
			newState = { ...state };
			newState[action.coin.id] = action.coin;
			return newState;
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
