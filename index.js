function camelCase(word) {
  return word.split('').reduce((memo, current, index, arr) => {
    if (current !== '-') {
      var letter = (arr[index-1] === '-') ? current.toUpperCase() : current;
      memo += letter;
    }
    return memo;
  }, '');
}
module.exports = function(source) {
  var parsed = source
    // Split the style block into lines
    .split('\n')
    // Remove lines that don't include rules
    .filter(line => line.includes(';'))
    // Join rules to string to perform regular expression
    .join(' ')
    // Trim
    .trim()
    // Replace all repeating whitespace with one whitespace character
    .replace(/\s\+/g, ' ')
    // Rules are delimited by semicolon. Split string into rules
    .split(';')
    // Reduce rules into an object with camel cased keys
    .reduce((memo, current) => {
      var ruleTuple = current.split(':')
      var key = camelCase(ruleTuple[0]).trim();
      var value = ("" + ruleTuple[1]).trim();
      if (key) {
        memo[key] = value;
      }
      return memo;
    }, {});
  return 'module.exports = ' + JSON.stringify(parsed) + ';';
};
