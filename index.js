var css = require('css');

function camelCase(word) {
  word = "" + word;
  return word.split('').reduce((memo, current, index, arr) => {
    if (current !== '-') {
      var letter = (arr[index-1] === '-') ? current.toUpperCase() : current;
      memo += letter;
    }
    return memo;
  }, '');
}
module.exports = function(source) {
  var parsedStylesheet = css.parse(source).stylesheet;
  var selectors = parsedStylesheet && parsedStylesheet.rules.reduce((result, rule) => {
    var selector = rule.selectors[0];
    result[selector] = rule.declarations.reduce((memo, declaration) => {
      var property = declaration.property;
      var key = camelCase(property);
      var value = declaration.value;
      memo[key] = value;
      return memo;
    }, {});
    return result;
  }, {});

  return 'module.exports = ' + JSON.stringify(selectors) + ';';
};
