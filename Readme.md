# require-all

An easy way to require all files within a directory.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]

## Changes
```js
  // options.indexToParent -- Boolean, default false

  // if traversing multiple sub directories, the index will take the name of the folder

  //--dummy
  //  |--index.js
  //  |--file.js
  //--anotherDummy
  //  |--index.js

  // will result to
  //  { dummy: fromDummyIndex, file: fromFile, anotherDummy: fromAnotherDummyIndex }

  // options.dupKeysSuffix -- String, default 'Mod'
  
  // on key conflict, suffix is supplied

  //--dummy
  //  |--index.js
  //  |--dummy.js

  // will result to
  // { dummy: fromDummyIndex, dummyMod: fromDummyDummy }

  // options.excludeRootFile  -- String, default undefined

  // if you want to exclude a file on root dir

  // { excludeRootFile: 'index' }

  //--dummy
  //  |--index.js
  //  |--file.js

  // will result to
  // { file: fromFile }

  // options.filter -- Regex, default /^([^\.].*)\.js(on)?$/
  // options.excludeDirs -- Regex, default /^(__tests__|\.).*$/
  // options.recursive -- Boolean, default false
  // options.

```js

[npm-image]: https://img.shields.io/npm/v/require-all.svg
[npm-url]: https://npmjs.org/package/require-all
[downloads-image]: https://img.shields.io/npm/dm/require-all.svg
[downloads-url]: https://npmjs.org/package/require-all
[travis-image]: https://img.shields.io/travis/felixge/node-require-all/master.svg
[travis-url]: https://travis-ci.org/felixge/node-require-all
