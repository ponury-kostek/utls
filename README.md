# Utilities
[![Build Status](https://travis-ci.org/ponury-kostek/utls.svg)](https://travis-ci.org/ponury-kostek/utls)
[![Coverage Status](https://coveralls.io/repos/ponury-kostek/utls/badge.svg?branch=master&service=github)](https://coveralls.io/github/ponury-kostek/utls?branch=master)
[![npm version](https://badge.fury.io/js/utls.svg)](https://badge.fury.io/js/utls)
[![npm](https://img.shields.io/npm/dt/utls.svg)](https://www.npmjs.com/package/utls)
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
### fileExists(path)
Checks whether a file or directory exists
```path``` must be absolute path
### extend(destination, source)
Copy properties from source to destination object
