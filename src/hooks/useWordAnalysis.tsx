import { useMemo, useRef, useState } from 'react';
import {
	getSimilarityAndFrequency,
	MATCH_LEVEL,
} from 'src/utils/wordMatchAnalyser';

export type State = {
	frequency: number;
	similarWords: string[];
	isPristine: boolean;
};

export type ShouldFindSimilarWords = (word: string, diff?: number) => void;

const initialState: State = {
	frequency: 0,
	similarWords: [],
	isPristine: true,
};

/**
 * Custom React hook for providing word analysis
 */
function useWordAnalysis<T extends HTMLElement>() {
	const analysisWatchRef = useRef<T | null>(null);

	const [matchesFound, setMatchesFound] = useState({
		...initialState,
	});

	const shouldFindSimilarWords: ShouldFindSimilarWords = (
		wordOfInterest: string,
		levenshteinDistance: number = 1
	) => {
		if (!analysisWatchRef.current) return;
		const wordsUsed = analysisWatchRef.current.innerText.split(/\s+/);
		const matcherRegx = new RegExp('[' + wordOfInterest + ']', 'gi');
		const similarWords = [];
		let frequency = 0;
		for (let word of wordsUsed) {
			const match = getSimilarityAndFrequency(
				word,
				wordOfInterest,
				matcherRegx,
				levenshteinDistance
			);
			if (match === MATCH_LEVEL.IDENTICAL) {
				frequency += 1;
			}
			if (match === MATCH_LEVEL.SIMILAR) {
				similarWords.push(word);
			}
		}
		setMatchesFound({
			frequency,
			similarWords,
			isPristine: false,
		});
	};

	const resetResults = () => {
		setMatchesFound({
			...initialState,
		});
	};

	return useMemo(
		() => ({
			analysisWatchRef,
			matchesFound,
			resetResults,
			shouldFindSimilarWords,
		}),
		[matchesFound, shouldFindSimilarWords]
	);
}

export default useWordAnalysis;
