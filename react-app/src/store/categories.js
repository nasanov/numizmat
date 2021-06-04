// ################################################################ //
// ############################  TYPES  ########################### //
// ################################################################ //

const SET_CATEGORIES = 'set/CATEGORIES';

// ################################################################## //
// ############################  ACTIONS  ########################### //
// ################################################################## //

const setCategories = categories => ({
	type: SET_CATEGORIES,
	categories,
});

// ################################################################# //
// ############################  THUNKS  ########################### //
// ################################################################# //

export const getCategories = () => async dispatch => {
	const response = await fetch(`/api/coins/categories`);

	if (response.ok) {
		const data = await response.json();
		dispatch(setCategories(data.categories));
		return data;
	} else {
		throw response;
	}
};

// ################################################################### //
// ############################  REDUCERS  ########################### //
// ################################################################### //

const initialState = {};

export default function categoryReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_CATEGORIES:
			newState = { ...state, ...action.categories };
			return newState;
		default:
			return state;
	}
}
