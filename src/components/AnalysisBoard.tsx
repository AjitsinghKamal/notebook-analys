import styled from '@emotion/styled';
import { useState } from 'react';
import type { State, ShouldFindSimilarWords } from 'src/hooks/useWordAnalysis';

type Props = {
	results: State;
	resetActive: () => void;
	handleWordAnalysis: ShouldFindSimilarWords;
};

function AnalysisBoard({ handleWordAnalysis, results, resetActive }: Props) {
	const [find, setWordToFind] = useState('');

	const submitEntry = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const trimmedEntry = find.trim();
		trimmedEntry ? handleWordAnalysis(trimmedEntry) : resetActive();
	};

	const clearEntry = () => {
		!results.isPristine && resetActive();
		setWordToFind('');
	};

	return (
		<Sidepanel>
			<Form onSubmit={submitEntry}>
				<label htmlFor="search">
					Get Word Details
					{find && (
						<Clear onClick={clearEntry} type="button">
							Clear
						</Clear>
					)}
				</label>
				<Input
					name="search"
					placeholder="Analysis word"
					value={find}
					autoComplete="off"
					onChange={(e) => setWordToFind(e.target.value)}
				/>
				<Submit>Check</Submit>
			</Form>
			{results.isPristine ? (
				<Message>
					<small>
						Check frequency and usage similarties of a word in this
						notebook entry.
					</small>
				</Message>
			) : (
				<div>
					<Result>
						<small>Word Frequency</small>
						<strong>{results.frequency}</strong>
					</Result>
					<Result as="ul">
						<small>Similar words used</small>
						{results.similarWords.length ? (
							results.similarWords.map((word) => (
								<li key={word}>{word}</li>
							))
						) : (
							<li>
								<strong>0</strong>
							</li>
						)}
					</Result>
				</div>
			)}
		</Sidepanel>
	);
}

const Sidepanel = styled.aside`
	box-shadow: var(--shadow);
	padding: 12px;
	border-radius: 10px;
	margin: 0 16px;
	flex: 1 1 200px;
	overflow-y: auto;
	overflow-x: hidden;
`;

const Form = styled.form`
	position: relative;
	position: sticky;
	top: -40px;
	z-index: 10;

	& > label {
		margin-bottom: 10px;
		display: block;
		color: #696969;
		font-weight: 600;
		font-size: 1.2rem;
	}
`;

const Input = styled.input`
	padding: 12px;
	border-radius: 6px;
	border: 0;
	width: 100%;
	box-shadow: 0 0 0 2px var(--primary-300);
	padding-right: 50px;
`;

const Result = styled.div`
	margin: 12px 0;
	font-size: 1.2rem;
	background: var(--primary-transparent-200);
	border-radius: 6px;
	padding: 12px;
	color: var(--primary-900);
	& > small {
		font-size: 70%;
		font-weight: 500;
		opacity: 0.68;
	}
	& > strong {
		display: block;
		font-size: 1.5rem;
		line-height: 1.65;
	}
`;

const Submit = styled.button`
	position: absolute;
	right: 6px;
	font-size: 0.75rem;
	transform: translateY(-25%);
	bottom: 5px;
	background: var(--primary-transparent-100);
	border-radius: 3px;
	line-height: 2;
	&:hover {
		background: var(--primary-transparent-200);
	}
`;

const Clear = styled.button`
	font-size: 0.75rem;
	color: var(--danger-700);
	float: right;
	border-bottom: 1px solid;
	border-radius: 0;
`;
const Message = styled.p`
	color: #696969;
	padding: 24px 0;
`;
export default AnalysisBoard;
