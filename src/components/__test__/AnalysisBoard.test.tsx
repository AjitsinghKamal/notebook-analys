import AnalysisBoard from '../AnalysisBoard';
import { fireEvent, render } from '@testing-library/react';

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

test('should render list of similar words', () => {
	const mockHandlers = jest.fn();
	const result = {
		frequency: 10,
		similarWords: ['a', 'b'],
		isPristine: false,
	};
	const { getAllByRole } = render(
		<AnalysisBoard
			resetActive={mockHandlers}
			handleWordAnalysis={mockHandlers}
			results={result}
		/>
	);
	expect(getAllByRole('listitem').length).toEqual(result.similarWords.length);
});

// test('should render word frequency', () => {
// 	const mockHandlers = jest.fn();
// 	const result = {
// 		frequency: 10,
// 		similarWords: ['a', 'b'],
// 		isPristine: false,
// 	};
// 	const { getByTestId } = render(
// 		<AnalysisBoard
// 			resetActive={mockHandlers}
// 			handleWordAnalysis={mockHandlers}
// 			results={result}
// 		/>
// 	);
// 	expect(getByTestId('frequency')).toEqual(result.frequency);
// });

// test('should show placeholder', () => {
// 	const mockHandlers = jest.fn();
// 	const result = {
// 		frequency: 10,
// 		similarWords: ['a', 'b'],
// 		isPristine: false,
// 	};
// 	const { getByTestId } = render(
// 		<AnalysisBoard
// 			resetActive={mockHandlers}
// 			handleWordAnalysis={mockHandlers}
// 			results={result}
// 		/>
// 	);
// 	expect(getByTestId('placeholder')).toBeInTheDocument();
// });

test('should check that input is submitted', () => {
	const handleWordAnalysis = jest.fn();
	const mockReset = jest.fn();
	const result = {
		frequency: 10,
		similarWords: ['a', 'b'],
		isPristine: false,
	};
	const { getByText, getByRole, getByPlaceholderText } = render(
		<AnalysisBoard
			resetActive={mockReset}
			handleWordAnalysis={handleWordAnalysis}
			results={result}
		/>
	);
	fireEvent.change(getByPlaceholderText('analysis.placeholder'), {
		target: { value: 'test' },
	});
	fireEvent.submit(getByText('analysis.submit'));

	expect(handleWordAnalysis).toBeCalled();
});
