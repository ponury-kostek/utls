# Utilities
[![Build Status](https://travis-ci.org/ponury-kostek/utls.svg)](https://travis-ci.org/ponury-kostek/utls)
[![Coverage Status](https://coveralls.io/repos/ponury-kostek/utls/badge.svg?branch=master&service=github)](https://coveralls.io/github/ponury-kostek/utls?branch=master)
[![npm version](https://badge.fury.io/js/utls.svg)](https://badge.fury.io/js/utls)
[![npm](https://img.shields.io/npm/dt/utls.svg)](https://www.npmjs.com/package/utls)
[![Code Climate](https://codeclimate.com/github/ponury-kostek/utls/badges/gpa.svg)](https://codeclimate.com/github/ponury-kostek/utls)
### getType(value)
Returns type of given value or name of function/object.
### microtime()
Returns number of seconds since 1 January 1970 00:00:00 UTC.
### ucFirst(string)
Returns a string with the first character of ```string``` capitalized, if that character is alphabetic.
### lcFirst(string)
Returns a string with the first character of ```string``` lowercased, if that character is alphabetic.
### camelCase(string)
Returns a camel-cased string. Word boundaries are "-", "_", " "
### pascalCase(string)
Returns a pascal-cased string. Word boundaries are "-", "_", " "
### fileExists(path)
Checks whether a file or directory exists
```path``` must be absolute path
### mkdir(path)
### extend(destination, source)
Copy properties from source to destination object
### promisesWaterfall(promises, initial)
### traverse(value, match, callback, key, origin)
Filters and transforms values
### equals(first, second)
Checks objects or arrays are equal
### vcopy(value)
### isCircular
### map
### filter
## Docs
See [utls github.io pages](http://ponury-kostek.github.io/utls/)