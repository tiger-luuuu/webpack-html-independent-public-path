const pName = 'WebpackHTMLIndependentPublicPath';

function getTagSrc(tag) {
  // Get asset path - src from scripts and href from links
  return tag.attributes.href || tag.attributes.src;
}

function filterTag(tag) {
  // Process only script and link tags with a url
  return (tag.tagName === "script" || tag.tagName === "link") && getTagSrc(tag);
}

class WebpackHTMLIndependentPublicPath {
  constructor(options) {
    this.assetsPath = options.publicPath;
  }

  processTag(tag) {
    if (tag.attributes.href) {
      const fileName = tag.attributes.href.split('/').pop();
      tag.attributes.href = this.assetsPath + fileName;
    }

    if (tag.attributes.src) {
      const fileName = tag.attributes.src.split('/').pop();
      tag.attributes.src = this.assetsPath + fileName;
    }
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlWebpackPluginHooks', compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(pName, (data, callback) => {
        const processTag = this.processTag.bind(this);
        data.head.filter(filterTag).forEach(processTag);
        data.body.filter(filterTag).forEach(processTag);
        callback(null, data);
      });
    });
  }
}

module.exports = WebpackHTMLIndependentPublicPath;
