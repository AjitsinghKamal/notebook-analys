import { StrictMode } from 'react';
import { render } from 'react-dom';
import Router from './router/Router';
import { registerSW } from 'virtual:pwa-register';

import './styles/reset.css';
import './styles/tokens.css';
import './styles/index.css';

import './locales';

render(
	<StrictMode>
		<Router />
	</StrictMode>,
	document.querySelector('#root')
);

registerSW();
