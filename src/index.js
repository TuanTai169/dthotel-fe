import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/scss/grid.scss';
import './assets/scss/theme.scss';
import './assets/scss/index.scss';

import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
document.title = 'DTH SOFT';
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>{' '}
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
