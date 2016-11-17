var fs = require('fs');
var path = require('path');

var DEFAULT_EXCLUDE_DIR = /^(__tests__|\.).*$/;
var DEFAULT_FILTER = /^([^\.].*)\.js(on)?$/;
var DEFAULT_RECURSIVE = false;
var DEFAULT_INDEX_TO_PARENT = false;
var DEFAULT_SUFFIX = 'Mod';

module.exports = function requireAll(options) {
  var dirname = typeof options === 'string' ? options : options.dirname;
  var excludeDirs = options.excludeDirs || DEFAULT_EXCLUDE_DIR;
  var filter = options.filter || DEFAULT_FILTER;
  var recursive = options.recursive || DEFAULT_RECURSIVE;
  var resolve = options.resolve || identity;
  var map = options.map || identity;

  var modules = options.modules || {};
  var indexToParent = options.indexToParent || DEFAULT_INDEX_TO_PARENT;
  var excludeRootFile = options.excludeRootFile || undefined;
  var dupKeysSuffix = options.dupKeysSuffix || DEFAULT_SUFFIX;

  function excludeDirectory(dirname) {
    return !recursive ||
      (excludeDirs && dirname.match(excludeDirs));
  }

  function dedupeKeys(modules, key) {
    if (modules[key]) return key + '' + dupKeysSuffix
    return key
  }

  var files = fs.readdirSync(dirname);

  files.forEach(function (file) {

    var filepath = dirname + '/' + file;
    if (fs.statSync(filepath).isDirectory()) {

      if (excludeDirectory(file)) return;

      requireAll({
        dirname: filepath,
        filter: filter,
        excludeDirs: excludeDirs,
        map: map,
        indexToParent: indexToParent,
        resolve: resolve,
        modules: modules
      });

    } else {
      var match = file.match(filter);
      var key = ''

      if (!match) return;
      if (excludeRootFile && file.indexOf(excludeRootFile) !== -1) return;

      key = indexToParent && file.indexOf('index') > - 1 ?
        dedupeKeys(modules,
          path.resolve(
            path.parse(filepath).dir
          ).split(path.sep).pop()
        ) :
        dedupeKeys(modules, map(match[1], filepath));

      modules[key] = resolve(require(filepath));
    }
  });

  return modules;
};

function identity(val) {
  return val;
}
