// ################################################################ //
// ############################  TYPES  ########################### //
// ################################################################ //

const SET_COLLECTIONS = 'set/COLLECTIONS';
const ADD_COLLECTION = 'add/COLLECTION';
// ? const EDIT_COLLECTION = 'edit/COLLECTION';
// ? const DELETE_COLLECTION = 'delete/COLLECTION';

// ################################################################## //
// ############################  ACTIONS  ########################### //
// ################################################################## //

const setCollections = collections => ({
	type: SET_COLLECTIONS,
	collections,
});

export const addCollection = collection => ({
	type: ADD_COLLECTION,
	collection,
});

// ? export const editCollection = collection => ({
// ? 	type: EDIT_COLLECTION,
// ? 	collection
// ? })

// ? export const deleteCollection = collection => ({
// ? 	type: DELETE_COLLECTION,
// ? 	collection,
// ? })

// ################################################################# //
// ############################  THUNKS  ########################### //
// ################################################################# //

export const getCollections = () => async dispatch => {
	const response = await fetch(`/api/collections/`);

	if (response.ok) {
		const data = await response.json();
		dispatch(setCollections(data.collections));
		return data;
	} else {
		throw response;
	}
};

export const addNewCollection = collection_name => async dispatch => {
	const response = await fetch(`/api/collections/`, {
		method: 'POST',
		body: JSON.stringify(collection_name),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(addCollection(data.collection));
		return data.collection;
	} else {
		throw response;
	}
};

// ################################################################### //
// ############################  REDUCERS  ########################### //
// ################################################################### //

const initialState = {};

export default function collectionReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_COLLECTIONS:
			newState = { ...state, ...action.collections };
			return newState;
		case ADD_COLLECTION:
			newState = { ...state };
			newState[action.collection.id] = action.collection;
			return newState;
		default:
			return state;
	}
}
