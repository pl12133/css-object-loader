'use strict;'
var css = require('css');
var camelCase = require('camelcase');

module.exports = function(source) {
  var parsedStylesheet = getParsedStylesheet(source);
  var selectors = parsedStylesheet && parsedStylesheet.rules.reduce(reduceRulesToSelectors, {});
  return 'module.exports = ' + JSON.stringify(selectors) + ';';
};

function getParsedStylesheet(source) {
  return css.parse(source).stylesheet;
}

function isValidRule(rule) {
  return rule.type === 'rule' && rule.selectors && rule.selectors.length;
}

function reduceDeclarationsToStyleObject(styleObj, declaration) {
  var property = declaration.property;
  var key = camelCase(property);
  var value = declaration.value;
  styleObj[key] = value;
  return styleObj;
}

function reduceRulesToSelectors(selectors, rule) {
  if (!isValidRule(rule)) {
    return selectors;
  }
  rule.selectors.forEach((selector) => {
    selectors[selector] = Object.assign({},
        selectors[selector],
        rule.declarations.reduce(reduceDeclarationsToStyleObject, {})
    );
  });
  return selectors;
}
