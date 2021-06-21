import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppShell from 'src/layouts/Shell';
import AsyncRoute from './AsyncRoute';

function Router() {
	return (
		<BrowserRouter>
			<AppShell>
				<Switch>
					<Route>
						<AsyncRoute path="/" page="Entry" />
					</Route>
				</Switch>
			</AppShell>
		</BrowserRouter>
	);
}

export default Router;
