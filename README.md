[![npm version](https://badge.fury.io/js/css-object-loader.svg)](https://badge.fury.io/js/css-object-loader)[![Build Status](https://travis-ci.org/pl12133/css-object-loader.svg?branch=master)](https://travis-ci.org/pl12133/css-object-loader)[![Coverage Status](https://coveralls.io/repos/github/pl12133/css-object-loader/badge.svg?branch=master)](https://coveralls.io/github/pl12133/css-object-loader?branch=master)

<p align="center">
  <img src='http://i.imgur.com/PXYAzQE.png' title='CSS Object Loader' alt='CSS Object Loader'></img>
</p>

# css-object-loader

Webpack loader to load CSS into an object. The object has keys that are selectors from the CSS file; the value of each selector are the rules converted to camelCase properties ([see Style Object Properties](http://www.w3schools.com/jsref/dom_obj_style.asp)). This object is compatible with [React Inline Styles](https://facebook.github.io/react/tips/inline-styles.html).

## Install

`npm install -D css-object-loader`

## Usage:

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

Create an entry to load `.css` files in your webpack.config:

```js
module: {
  loaders: [{
      test: /\.css$/,
      loaders: [ 'css-object' ],
      exclude: /node_modules/
    }
  ]
}
```

Requiring CSS rules:

```css
+ rules.css
p {
  font-size: 14px;
}
h1 {
  text-indent: 20px;
}
.centered {
  width: 100%;
  margin: 0 auto;
}
```

```js
var selectors = require('./rules.css');
console.log(selectors);
// Output:
// selectors: {
//    p: {
//      fontSize: '14px'
//    },
//    h1: {
//      textIndent: '20px'
//    },
//    '.centered': {
//      width: '100%',
//      margin: '0 auto'
//    }
// }
```

Now you can use those rules however you like:
###### React
```js
const MyComponent = ({children}) => (
  <div style={selectors['.centered']}>{children}</div>
);
```

###### DOM
```js
function applyStylesToNode (styles, node) {
  Object.keys(styles).forEach(key => { node.style[key] = styles[key] });
}
applyStylesToNode(selectors['.centered'], document.querySelector('#some-div'));
```

### Use Case

1. You want to inline all your styles, but you still want to write your CSS into CSS files.
2. You want to use a CSS preprocessor to write your inline styles.

### Multiple Loaders

##### Use with other CSS loaders

If you are already using a different CSS related loader like [css-loader](https://github.com/webpack/css-loader) or [style-loader](https://github.com/webpack/style-loader), it is easy to use `css-object-loader` on a single file. For example:

```js
// Use the loaders from your webpack config:
import styles from './styles.css';
// Explicity use `css-object-loader`:
import styleObject from '!css-object!./styles.css';
// With SASS:
import sassStyleObject from '!css-object!sass!./styles.scss';
```

This allows you to introduce `css-object-loader` into your projects without making breaking changes.

__NOTE__: If you import a CSS file with `:local(...)` selectors, the selector object will include the `:local(...)` string.

##### Preprocessors

If you want to use `css-object-loader` with LESS or SASS, make sure the preprocessor loader runs before `css-object-loader`. Webpack evaluates loaders right to left. Example config for SASS:

```js
module: {
  loaders: [{
    test: /\.scss$/,
    loaders: [ 'css-object', 'sass' ],
    exclude: /node_modules/
  }]
}
```

## Limitations

This library is currently a proof of concept and not intended for production usage. This loader should function with other CSS preprocessors as long as they run before `css-object-loader`. The underlying concept is still a work in progress, if you have any suggestions please feel free to open an issue.

## Implementation

This library uses [reworkcss/css](https://github.com/reworkcss/css) to parse CSS to an AST. The AST is then traversed to find rule declarations and populate them into an object. Media queries are ignored.

## Contributing

Questions, criticism and pull requests are always welcome.
