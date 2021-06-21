module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'\\.svg$': '<rootDir>/__mocks__/svgr.ts',
		'^.+\\.(css|scss|png|jpg)$': 'identity-obj-proxy',
		'^src(.*)$': '<rootDir>/src$1'
	},
	setupFilesAfterEnv: ['<rootDir>/setup-tests.ts'],
	resetMocks: true
};
