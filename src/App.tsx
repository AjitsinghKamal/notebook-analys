import { useState } from 'react';
import { css } from '@emotion/css';
import './App.css';

function App({ ...rest }) {
	const [count, setCount] = useState(0);

	return (
		<div className={app} {...rest}>
			<header className="App-header">
				<p>Hello Vite + React!</p>
				<p>
					<button
						type="button"
						onClick={() => {
							setCount((count) => count + 1);
						}}
					>
						count is: {count}
					</button>
				</p>
				<p>
					Edit <code>App.tsx</code> and save to test HMR updates.
				</p>
				<p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
					{' | '}
					<a
						className="App-link"
						href="https://vitejs.dev/guide/features.html"
						target="_blank"
						rel="noopener noreferrer"
					>
						Vite Docs
					</a>
				</p>
			</header>
		</div>
	);
}

const app = css`
	background: #a0a0a0;
`;
export default App;
