import React from 'react';
import ReactDOM from 'react-dom';

import BreadMixerWithReducer from './components/BreadMixerWithReducer';

import 'normalize.css/normalize.css'; // reset your browser to start your styling a-fresh
import './styles/style.scss';
import './lib/noConsoleLog';

let hasRendered = false;
const renderApp = () => {
	if(hasRendered) return;
	ReactDOM.render(jsx, document.getElementById('app'));
	hasRendered = true;
};

const jsx = (
	<BreadMixerWithReducer />
);

renderApp();