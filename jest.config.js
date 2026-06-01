module.exports = {
    testPathIgnorePatterns: ['/fixtures/'],
    moduleNameMapper: {
        '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
    },
};
