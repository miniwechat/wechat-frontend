// postcss-mpvuew-wxss.js
// https://github.com/postcss/postcss/blob/master/docs/writing-a-plugin.md

const postcss = require('postcss');
const selectorParser = require('postcss-selector-parser');
const replaceTagSelector = require('./lib/wxmlTagMap');

const defConfig = {
  cleanSelector: ['*'],
  remToRpx: 100,
  replaceTagSelector
};

const remReg = /(\d*\.?\d+)rem/ig;
const replaceRemOption = { fast: 'rem' };

module.exports = postcss.plugin('postcss-mpvue-wxss', function (options) {
  // Work with options here
  options = Object.assign({}, defConfig, options);

  return function (root) {
    // Transform CSS AST here： root, result
    root.walkRules(rule => {
      const { selector } = rule || {};

      // rem 转换 rpx
      rule.replaceValues(remReg, replaceRemOption, str => {
        return options.remToRpx * parseFloat(str) + 'rpx';
      });

      rule.selector = selectorParser(function (selectors) {
        selectors.each(function (selector) {
          selector.each(function (n) {
            // 转换 tag 选择器
            if (n.type === 'tag') {
              const k = n.value;
              const v = options.replaceTagSelector[k];
              if (v) {
                n.value = v === 'replaceToClass' ? `._${k}` : v;
              }
            }

            // 清理不支持的选择器
            if (options.cleanSelector.includes(n.value)) {
              // return n.value = 'view';
              return rule.remove()
            }
          })
        })
      }).process(selector).result;
    });

    // 清理所有的注释
    root.walkComments(comment => {
      comment.remove();
    });
  };
});
