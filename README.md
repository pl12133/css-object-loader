# css-object-loader
Load a file with CSS Rules into an object

# Install

npm install -D css-object-loader

# Usage:

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
.styles {
  font-size: 12px;
  margin: 0 auto;
  background: green no-repeat center center !important;
}
```

```js
var selectors = require('./rules.css');
console.log(selectors);
// Output:
// selectors: {
//   '.styles': {
//     fontSize: '12px',
//     margin: '0 auto',
//     background: 'green no-repeat center center !important'
//   }
// }
```

Now you can use those rules however you like:
###### React
```js
const MyComponent = ({children}) => (
  <div style={selectors['.styles']}>{children}</div>
);
```

###### DOM
```js
function applyStylesToNode (styles) {
  let nodeMutator = (node) => {
    Object.keys(styles).forEach(key => node.style[key] = styles[key]);
    return node;
  };
  return nodeMutator;
}
applyStylesToNode(selectors['.styles'])(document.querySelector('#some-div'))
```

# Limitations

This library uses [reworkcss/css](https://github.com/reworkcss/css) to parse CSS. It is currently a proof of concept and not intended for production usage. This loader is currently untested with any other CSS loaders. The underlying concept is still a work in progress, if you have any suggestions please feel free to open an issue.
