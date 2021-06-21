import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AsyncRoute from './AsyncRoute';

function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route>
					<AsyncRoute path="/" page="Entry" />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
