import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/test/**/*.test.ts'],
    testTimeout: 20000,
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.test.json'
        }
    }
};

export default config;
