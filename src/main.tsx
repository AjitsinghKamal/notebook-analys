import { StrictMode } from 'react';
import { render } from 'react-dom';
import Router from './router/Router';
import './styles/index.css';

render(
	<StrictMode>
		<Router />
	</StrictMode>,
	document.querySelector('#root')
);
