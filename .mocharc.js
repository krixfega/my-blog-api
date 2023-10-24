module.exports = {
    // Specify the test environment (e.g., Node.js)
    require: 'mocha-superset',
  
    // Set the reporter (e.g., 'spec', 'nyan', 'dot', 'json', 'list', etc.)
    reporter: 'mochawesome',
  
    // Configure test timeout (in milliseconds)
    timeout: 5000,
  
    // Enable retries for failed tests (useful for flaky tests)
    retries: 2,
  
    // Enable slow test warning (in milliseconds)
    slow: 1000,
  
    // Specify which files to include in the test suite
    spec: ['tests/**/*.js'],
  
    // Configure Babel or other transpilers if necessary
    // For example, to use Babel with ES6 modules:
    // require: ['@babel/register'],
  
    // Other Mocha options (e.g., --require, --exit, --watch, --grep, etc.)
  };
  