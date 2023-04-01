import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	dir: './',
});

/** @type {import('jest').Config} */
const config = {
	testEnvironment: 'jest-environment-jsdom',
	verbose: true,
	setupFilesAfterEnv: ['<rootDir>/jest-preload.js'],
};

export default createJestConfig(config);
