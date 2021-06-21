import loadable from '@loadable/component';
import { Route } from 'react-router-dom';
import { Fallback } from 'src/components';

/**
 * utility component to dynamically import any page component
 *
 * specify @vite-ignore
 * since, vite will throw a warning due to no file-extension specification
 *
 */

type Props = {
	page: string;
	fallback?: JSX.Element;
	path: string;
	[x: string]: any;
};

const DynamicPage = loadable(
	({ page }: { page: string }) => {
		return import(`../pages/${page}.tsx`);
	},
	{
		cacheKey: ({ page }) => page,
	}
);

const AsyncRoute = ({
	page,
	path,
	fallback = <Fallback />,
	...routeProps
}: Props) => (
	<Route path={path} {...routeProps}>
		<DynamicPage page={page} fallback={fallback} />
	</Route>
);

export default AsyncRoute;
