import React from 'react';
import { createContext, useContext, useState } from 'react';

export const SearchContext = createContext();
export const useSearch = () => useContext(SearchContext);

export const SearchProvider = props => {
	const [searchParam, setSearchParam] = useState('');
	const [matchingValues, setMatchingValues] = useState([]);

	return (
		<SearchContext.Provider value={{ searchParam, setSearchParam, matchingValues, setMatchingValues }}>
			{props.children}
		</SearchContext.Provider>
	);
};

export default SearchProvider;
