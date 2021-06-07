// ################################################################ //
// ############################  TYPES  ########################### //
// ################################################################ //

const FILTER_COINS_BY_COUNTRY = 'filter_by_country/COINS';
const SORT_COINS_BY_YEAR = 'sort_by_year/COINS';

// ################################################################## //
// ############################  ACTIONS  ########################### //
// ################################################################## //

export const filterByCountry = (coins, country) => ({
	type: FILTER_COINS_BY_COUNTRY,
	filteredItems: {
		country,
		items: country === '' ? coins : coins.filter(a => a.country.indexOf(country) >= 0),
	},
});

export const sortByYear = (coins, sort) => ({
	type: SORT_COINS_BY_YEAR,
	filteredItems: {
		sort: sort,
		items: coins,
	},
});
// ################################################################# //
// ############################  THUNKS  ########################### //
// ################################################################# //

export const filterCoinsByCountry = (coins, country) => async dispatch => {
	let coins_arr = [];
	for (let i in coins) {
		coins_arr.push(coins[i]);
	}
	dispatch(filterByCountry(coins_arr, country));
	return coins;
};

export const sortCoinsByYear = (coins, sort) => async dispatch => {
	let coins_arr = coins['items'];
	// console.log('$$$$$', coins_arr);
	// if (sort !== '') {
	// 	coins_arr.sort((a, b) => (sort === ('lowest') ?
	// 	(a.year > b.year ? 1:-1)
	// 	: (a.year < b.year ? 1 : -1))
	// } else {
	coins_arr.sort((a, b) => (a.sort > b.sort ? 1 : -1));
	// }
	// console.log('sorted, ', coins);
	dispatch(sortByYear(coins_arr, sort));
	return coins_arr;
};
// ################################################################### //
// ############################  REDUCERS  ########################### //
// ################################################################### //

const initialState = {};

export default function filteredCoinReducer(state = initialState, action, filteredItems = [], country = '') {
	let newState;
	switch (action.type) {
		case FILTER_COINS_BY_COUNTRY:
			newState = { ...state, ...action.filteredItems };
			return newState;
		case SORT_COINS_BY_YEAR:
			newState = { ...state, ...action.filteredItems };
			return newState;
		default:
			return state;
	}
}
