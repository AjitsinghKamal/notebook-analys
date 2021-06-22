import {getSimilarityAndFrequency, MATCH_LEVEL} from "../wordMatchAnalyser";

test('should find identical word', () => {
	const result = getSimilarityAndFrequency('test', 'test', /[test]/gi, 1)
	expect(result).toEqual(MATCH_LEVEL.IDENTICAL);
})

test('should find if similar', () => {
	const result = getSimilarityAndFrequency('tost', 'test', /[test]/gi, 1)
	expect(result).toEqual(MATCH_LEVEL.SIMILAR);
})

test('should reject if no match', () => {
	const result = getSimilarityAndFrequency('tost', 'tester', /[test]/gi, 1)
	expect(result).toEqual(MATCH_LEVEL.NO_MATCH);
})