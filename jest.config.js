export default {
    testPathIgnorePatterns: ['/fixtures/'],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    moduleNameMapper: {
        '\\.(css|less|svg|png)$': '<rootDir>/__tests__/moduleMock.js',
        '@careevolution/mydatahelps-js': '<rootDir>/__tests__/moduleMock.js',
        'punycode': '<rootDir>/__tests__/moduleMock.js'
    }
};