import Note from '../Note';
import { waitFor, render } from '@testing-library/react';

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
test('should render editor and analysis board', async () => {
	const { getByRole, getByPlaceholderText } = render(<Note />);
	await waitFor(() => getByRole('heading'));
	expect(getByRole('heading')).toHaveTextContent('Notebook');
	expect(getByPlaceholderText('analysis.placeholder')).toBeInTheDocument();
});
