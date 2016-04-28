# css-object-loader
Load a file with CSS Rules into an object

# Usage:

Create a `.csso` file and add CSS Rules to it:

###### + rules.csso
```css
font-size: 12px;
margin: 0 auto;
background: green no-repeat center center !important;
```

Create an entry to load `.csso` files in your webpack.config:

```js
  module: {
    loaders: [{
        test: /\.csso$/,
        loaders: [ 'css-object' ],
        exclude: /node_modules/
      }
    ]
  }
```

Require your rules and they will become an object:

```js
var rules = require('./rules.csso');
console.log(styles);
// Output:
// styles = {
//   fontSize: '12px',
//   margin: '0 auto',
//   background: 'green no-repeat center center !important
// }
```

Now you can use those rules however you like:
###### React
```js
const MyComponent = ({children}) => (
  <div style={rules}>{children}</div>
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
applyStylesToNode(rules)(document.querySelector('#some-div'))
```
