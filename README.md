# webpack-html-independent-public-path

Define a independent public path with html-webpack-plugin.

### Usage
```javascript
new HtmlWebpackPlugin(),
// append after HtmlWebpackPlugin
new WebpackHTMLIndependentPublicPath({
  publicPath: 'xxxx'
})
```
