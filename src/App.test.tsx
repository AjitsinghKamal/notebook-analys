import {render, screen} from '@testing-library/react';
import App from './App';

test('app renders', () => {
	const testId = 'test-editor';
	render(<App data-testid={testId} />);
	const editorInstance = screen.getByTestId(testId);
	expect(editorInstance).toBeInTheDocument();
});
