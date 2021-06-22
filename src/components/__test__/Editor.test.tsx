import { waitFor, render } from '@testing-library/react';
import Editor from '../Editor';
import { getCache } from '../../utils/storage';
import { mocked } from 'ts-jest/utils';

jest.mock('react-i18next', () => ({
	// this mock makes sure any components using the translate hook can use it without a warning being shown
	useTranslation: () => {
		return {
			t: (str: any) => str,
			i18n: {
				changeLanguage: () => new Promise(() => {}),
			},
		};
	},
}));

jest.mock('../../utils/storage', () => ({
	getCache: jest.fn(),
	setCache: jest.fn(),
}));

const mockedGetCache = mocked(getCache);

test('should render fresh editor', async () => {
	const { getByRole, getByTestId } = render(<Editor />);
	await waitFor(() => getByRole('heading'));
	expect(getByRole('heading')).toHaveTextContent('Notebook');
	expect(getByTestId('placeholder')).toBeInTheDocument();
});

test('should render editor with local value', async () => {
	mockedGetCache.mockResolvedValue('<h1>Test</h1>');
	const { getByRole } = render(<Editor />);
	await waitFor(() => getByRole('heading'));
	expect(getByRole('heading')).toHaveTextContent('Test');
});
