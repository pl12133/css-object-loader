<p align="center">
  <img src='http://i.imgur.com/PXYAzQE.png' title='CSS Object Loader' alt='CSS Object Loader'></img>
</p>

# css-object-loader

Webpack loader to load CSS into a selector object with camelCased properties. Load a CSS file and it will return an object with keys that are the selectors from that CSS file. Each selector has an object containing the rules declared in your CSS.

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
  Object.keys(styles).forEach(key => node.style[key] = styles[key]);
  return node;
}
applyStylesToNode(selectors['.centered'], document.querySelector('#some-div'));
```

### Multiple Loaders

If you want to use `css-object-loader` with LESS or SASS, make sure the preprocessor loader runs before `css-object-loader`. Webpack evaluates loaders right to left. Example config for SASS:

```js
module: {
  loaders: [{
    test: /\.scss/,
    loaders: [ 'css-object', 'sass' ],
    exclude: /node_modules/
  }]
}
```

## Limitations

This library uses [reworkcss/css](https://github.com/reworkcss/css) to parse CSS. It is currently a proof of concept and not intended for production usage. This loader should function with other CSS preprocessors as long as they run before `css-object-loader`. The underlying concept is still a work in progress, if you have any suggestions please feel free to open an issue.

## Contributing

Questions, criticism and pull requests are always welcome.
