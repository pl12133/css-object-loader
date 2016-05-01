// BEGIN IMPORTS
var fs = require('fs');
var path = require('path');
var cssObjectLoader = require('../');
var expect = require('chai').expect;
// END IMPORTS

// Load test CSS file
var source = fs.readFileSync(path.resolve('test', 'style-spec.css'), 'utf-8');

// Loader returns a string with 'module.exports = ...';
var loaderString = cssObjectLoader(source);

// Parse the JSON that is in the loaded CSS
var loadedJSON = loaderString.replace(/.*?({.*}).*/, (m, $1) => $1);

// The Object the loader actually returns.
var actual = JSON.parse(loadedJSON);
describe('css-object-loader', () => {
  it('is a function', () => {
    expect(cssObjectLoader).to.be.a('function');
  });

  it('should be able to transform css', () => {
    expect({
      fontSize: '14px',
      fontWeight: 'bold'
    }).to.deep.equal(actual['p']);

    expect({
      background: 'green',
      textAlign: 'center'
    }).to.deep.equal(actual['h1']);
  });
});
