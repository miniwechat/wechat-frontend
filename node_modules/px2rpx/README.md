# px2rpx

According to one stylesheet, generate rpx version and @1x, @2x and @3x stylesheet.

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/px2rpx.svg?style=flat-square
[npm-url]: https://npmjs.org/package/px2rpx
[downloads-image]: http://img.shields.io/npm/dm/px2rpx.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/px2rpx

This set of tools contains:

* a CLI tool
* [webpack loader](https://www.npmjs.com/package/px2rpx-loader)

## Usage

The raw stylesheet only contains @2x style, and if you

* don't intend to transform the original value, eg: 1px border, add `/*no*/` after the declaration
* intend to use px by force，eg: font-size, add `/*px*/` after the declaration

**Attention: Dealing with SASS or LESS, only `/*...*/` comment can be used, in order to have the comments persisted**

### CLI tool

```
$ npm install -g px2rpx
```
```
$ px2rpx -o build src/*.wxss
```

```
  Usage: px2rpx [options] <file...>

  Options:

    -h, --help                      output usage information
    -V, --version                   output the version number
    -u, --rpxUnit [value]           set `rpx` unit value (default: 75)
    -x, --threeVersion [value]      whether to generate @1x, @2x and @3x version stylesheet (default: false)
    -r, --rpxVersion [value]        whether to generate rpx version stylesheet (default: true)
    -b, --baseDpr [value]           set base device pixel ratio (default: 2)
    -p, --rpxPrecision [value]      set rpx value precision (default: 6)
    -o, --output [path]             the output file dirname
```

### API

```
var Px2rpx = require('px2rpx');
var px2rpxIns = new Px2rpx([config]);
var originCssText = '...';
var dpr = 2;
var newCssText = px2rpxIns.generaterpx(originCssText); // generate rpx version stylesheet
var newCssText = px2rpxIns.generateThree(originCssText, dpr); // generate @1x, @2x and @3x version stylesheet
```
## License

MIT
