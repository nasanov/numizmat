import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import ModalProvider from './context/Modal';
import SearchProvider from './context/Search';

const store = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<ModalProvider>
			<SearchProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</SearchProvider>
		</ModalProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
