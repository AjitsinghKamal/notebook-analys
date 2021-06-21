export enum MATCH_LEVEL {
	NO_MATCH,
	IDENTICAL,
	SIMILAR,
}

/**
 * Analyse a given word to check if it is
 * a match or similarilty to a given word
 *
 * @param word
 * required: word in test
 * @param wordOfInterest
 * reuired: word to test against
 * @param matchRegx
 * regx to apply
 * @param levenshteinDistance
 * difference to look for between words
 * @returns
 */
export function getSimilarityAndFrequency(
	word: string,
	wordOfInterest: string,
	matchRegx: RegExp,
	levenshteinDistance: number = 1
) {
	let matchLevel = MATCH_LEVEL.NO_MATCH;
	if (
		word.length <= wordOfInterest.length + levenshteinDistance &&
		word.length >= wordOfInterest.length - levenshteinDistance
	) {
		// do further test on those words whose length
		// safely lies between the range to support character operations
		// within Levenshtein Distance
		if (word === wordOfInterest) {
			matchLevel = MATCH_LEVEL.IDENTICAL;
		} else {
			const matches = word.match(matchRegx);
			if (matches && matches.length >= wordOfInterest.length - 1) {
				matchLevel = MATCH_LEVEL.SIMILAR;
			}
		}
	}
	return matchLevel;
}
