/**
 * @author Michał Żaloudik <michal.zaloudik@redcart.pl>
 */
"use strict";
/**
 * @type {Object}
 * @private
 */
var __vcopy_handlers = {};
/**
 * @author Michał Żaloudik <michal.zaloudik@redcart.pl>
 */
class utls {
	/**
	 * Throws error if u try to instantiate utls class
	 * @throws {Error}
	 */
	constructor() {
		throw new Error('Class "utls" cannot be instantiated');
	}

	/**
	 * Returns type of given value or name of function/object.
	 * @param {*} value
	 * @return {String}
	 */
	static getType(value) {
		var type = /\[object ([^\]]*)]/.exec(Object.prototype.toString.call(value))[1];
		var name = '';
		switch (type) {
			case 'Number':
				if (value % 1 !== 0) {
					type = 'Float';
				} else {
					type = 'Integer';
				}
				break;
			case 'Function':
				name = (/(function|class) ([a-zA-Z_][a-zA-Z0-9_]*)/.exec(Function.prototype.toString.call(value)) || []).pop();
				type = typeof name == 'string' && name.length ? name : type;
				break;
			case 'Object':
				name = utls.getType(value.constructor);
				type = name !== 'Function' ? name : type;
				break;
			default:
				break;
		}
		return type;
	}

	/**
	 * Returns number of seconds since 1 January 1970 00:00:00 UTC.
	 * @return {Number}
	 */
	static microtime() {
		return (new Date()).getTime() / 1000;
	}

	/**
	 * Returns a string with the first character of string capitalized, if that character is alphabetic.
	 * @param {String} string
	 * @return {String}
	 */
	static ucFirst(string) {
		return (string || '').charAt(0).toUpperCase() + string.slice(1);
	}

	/**
	 * Returns a string with the first character of string, lowercased if that character is alphabetic.
	 * @param {String} string
	 * @return {String}
	 */
	static lcFirst(string) {
		return (string || '').charAt(0).toLowerCase() + string.slice(1);
	}

	/**
	 * Returns a camel-cased string. Word boundaries are "\b", "-", "_", " "
	 * @param {String} string
	 * @returns {String}
	 */
	static camelCase(string) {
		return (string || '').toLowerCase().replace(/(-|\s|_)./g, function (m) {
			return m.toUpperCase().replace(/-|\s|_/, '');
		});
	}

	/**
	 * Returns a pascal-cased string. Word boundaries are "\b", "-", "_", " "
	 * @param {String} string
	 * @returns {String}
	 */
	static pascalCase(string) {
		return this.ucFirst(this.camelCase(string));
	}

	/**
	 * Checks whether a file or directory exists
	 * @throws {Error}
	 * @return {Boolean}
	 */
	static fileExists(path) {
		if (!require('path').isAbsolute(path)) {
			throw new Error("Path must be absolute!");
		}
		try {
			var fs = require('fs');
			fs.accessSync(fs.realpathSync(path), fs.F_OK);
		} catch (e) {
			return false;
		}
		return true;
	}

	/**
	 * Makes directory
	 * @param {String} path
	 * @param {Options} options
	 * @throws {Error}
	 */
	static mkdir(path, options) {
		options = options || {};
		options.mode = options.mode || 0o775;
		options.parents = options.parents || true;
		var xpath = require('path');
		var fs = require('fs');
		var parts = path.split(xpath.sep);
		if (options.parents) {
			for (var i = 1; i < parts.length; i++) {
				path = parts.slice(0, i).join(xpath.sep) + xpath.sep;
				if (!utls.fileExists(path)) {
					fs.mkdirSync(path, options.mode);
				}
			}
		} else {
			path = parts.splice(0, parts.length - 1).join(xpath.sep) + xpath.sep;
			if (utls.fileExists(path)) {
			}
		}
		return true;
	}

	/**
	 * Copy properties from source to destination object
	 * @param {Object} destination
	 * @param {Object} source
	 * @returns {*}
	 */
	static extend(destination, source) {
		destination = destination || {};
		source = source || {};
		for (var property in source) {
			if (source.hasOwnProperty(property) && source[property] && source[property].constructor && source[property].constructor === Object) {
				if (!(destination[property] && destination[property].constructor && destination[property].constructor === Object)) {
					destination[property] = {};
				}
				utls.extend(destination[property], source[property]);
			} else {
				destination[property] = source[property];
			}
		}
		return destination;
	}

	/**
	 * @param {Promise[]} promises
	 * @param {Promise} initial
	 * @returns {Promise}
	 */
	static promisesWaterfall(promises, initial) {
		if ("Promise" !== utls.getType(initial)) {
			throw new Error("Initial value must be Promise");
		}
		return new Promise((resolve, reject) => {
			var final = promises.reduce((prevTask, current) => {
				return prevTask.then(current).catch(reject);
			}, initial);
			final.then(resolve).catch(reject);
		});
	}

	/**
	 * @param {*} value
	 * @param {Function} match
	 * @param {Function} callback
	 * @param {String|Number} key
	 * @param {*} origin
	 * @returns {*}
	 */
	static traverse(value, match, callback, key, origin) {
		if (match(value)) {
			return callback(value, key, origin);
		} else if (utls.getType(value) == 'Array') {
			var arr = [];
			value.map((val, key, origin) => {
				var res = utls.traverse(val, match, callback, key, origin);
				if (res !== undefined) {
					arr.push(res);
				}
			});
			return arr;
		} else if (utls.getType(value) == 'Object') {
			var obj = {};
			for (var k in value) {
				var res = utls.traverse(value[k], match, callback, k, value);
				if (res !== undefined) {
					obj[k] = res;
				}
			}
			return obj;
		}
	}

	/**
	 * Checks objects or arrays are equal
	 *
	 * @param {Array|Object} first
	 * @param {Array|Object} second
	 * @returns {Boolean}
	 */
	static equals(first, second) {
		var __first_ref_cache = [];
		var __second_ref_cache = [];
		var __cmp_cache = [];
		var fidx, sidx, idx_cmp;

		function arrays(first, second) {
			if (first === second) {
				return true;
			}
			if (first.length !== second.length) {
				return false;
			}
			var length = first.length;
			for (var i = 0; i < length; i++) {
				if (typeof first[i] === 'object' && typeof second[i] === 'object') {
					if (~(fidx = __first_ref_cache.indexOf(first[i])) && ~(sidx = __second_ref_cache.indexOf(second[i]))) {
						idx_cmp = fidx + ',' + sidx;
						if (~__cmp_cache.indexOf(idx_cmp)) {
							continue;
						}
						__cmp_cache.push(idx_cmp);
					}
					__first_ref_cache.push(first[i]);
					__second_ref_cache.push(second[i]);
				}
				if (first[i] instanceof Array && second[i] instanceof Array) {
					if (!arrays(first[i], second[i])) {
						return false;
					}
				} else if (first[i] instanceof Object && second[i] instanceof Object) {
					if (!objects(first[i], second[i])) {
						return false;
					}
				} else if (first[i] !== second[i]) {
					return false;
				}
			}
			return true;
		}

		function objects(first, second) {
			if (first === second) {
				return true;
			}
			var firstProps = Object.getOwnPropertyNames(first).sort();
			var firstPropsLength = firstProps.length;
			var secondProps = Object.getOwnPropertyNames(second).sort();
			var key;
			if (firstPropsLength !== secondProps.length) {
				return false;
			}
			if (!arrays(firstProps, secondProps)) {
				return false;
			}
			for (var i = 0; i < firstPropsLength; i++) {
				key = firstProps[i];
				if (typeof first[key] === 'object' && typeof second[key] === 'object') {
					if (~(fidx = __first_ref_cache.indexOf(first[key])) && ~(sidx = __second_ref_cache.indexOf(second[key]))) {
						idx_cmp = fidx + ',' + sidx;
						if (~__cmp_cache.indexOf(idx_cmp)) {
							continue;
						}
						__cmp_cache.push(idx_cmp);
					}
					__first_ref_cache.push(first[key]);
					__second_ref_cache.push(second[key]);
				}
				if (first[key] instanceof Array && second[key] instanceof Array) {
					if (!arrays(first[key], second[key])) {
						return false;
					}
				} else if (first[key] instanceof Object && second[key] instanceof Object) {
					if (!objects(first[key], second[key])) {
						return false;
					}
				} else if (first[key] !== second[key]) {
					return false;
				}
			}
			return true;
		}

		if (first instanceof Array && second instanceof Array) {
			return arrays(first, second);
		} else if (first instanceof Object && second instanceof Object) {
			return objects(first, second);
		} else {
			return first === second;
		}
	}

	/**
	 * Makes copy of value (dereferences object values)
	 *
	 * @param {*} value
	 * @returns {*}
	 */
	static vcopy(value) {
		var __ref_cache = [];

		function _cp(value) {
			var idx;
			if (typeof value === 'object') {
				if (~(idx = __ref_cache.indexOf(value))) {
					return __ref_cache[idx];
				}
				__ref_cache.push(value);
			}
			var copy;
			if (typeof value === 'object') {
				var type = utls.getType(value);
				if (type === 'Array') {
					copy = value.map((val) => {
						return _cp(val);
					});
				} else if (type === 'Object') {
					copy = {};
					for (var k in value) {
						copy[k] = _cp(value[k]);
					}
				} else if (typeof __vcopy_handlers[type] === 'object' && __vcopy_handlers[type] !== null) {
					return __vcopy_handlers[type].handler(__vcopy_handlers[type].cls, value);
				} else {
					copy = value;
				}
			} else {
				copy = value;
			}
			return copy;
		}

		return _cp(value);
	}

	/**
	 *
	 * @param {Array|Object} value
	 * @returns {*}
	 */
	static isCircular(value) {
		var __ref = [];

		function check(value) {
			if (typeof value === 'object' && value !== null) {
				if (~__ref.indexOf(value)) {
					return true;
				}
				__ref.push(value);
				for (var k in value) {
					if (check(value[k])) {
						return true;
					}
				}
				__ref.pop();
			}
			return false;
		}

		return check(value);
	}

	/**
	 * @param {*} value
	 * @param {Function} callback
	 * @param {String|Number} key
	 * @param {*} origin
	 * @returns {*}
	 */
	static map(value, callback, key, origin) {
		var __ref_cache = [];

		function map(value, callback, key, origin) {
			var idx;
			var type = utls.getType(value);
			if (type == 'Array') {
				var arr = [];
				value.map((val, key, origin) => {
					if (typeof val === 'object' && ~(idx = __ref_cache.indexOf(val))) {
						arr.push(val);
					} else {
						if (typeof val === 'object') {
							__ref_cache.push(val);
						}
						arr.push(map(val, callback, key, origin));
						if (typeof val === 'object') {
							__ref_cache.pop();
						}
					}
				});
				return arr;
			} else if (type == 'Object') {
				var obj = {};
				for (var k in value) {
					if (typeof value[k] === 'object' && ~(idx = __ref_cache.indexOf(value[k]))) {
						obj[k] = value[k];
					} else {
						if (typeof value[k] === 'object') {
							__ref_cache.push(value[k]);
						}
						obj[k] = map(value[k], callback, k, value);
						if (typeof value[k] === 'object') {
							__ref_cache.pop();
						}
					}
				}
				return obj;
			} else {
				return callback(value, key, origin);
			}
		}

		return map(value, callback, key, origin);
	}

	/**
	 * @param {*} value
	 * @param {Function} callback
	 * @param {String|Number} key
	 * @param {*} origin
	 * @returns {*}
	 */
	static filter(value, callback, key, origin) {
		var __ref_cache = [];

		function filter(value, callback, key, origin) {
			var type = utls.getType(value);
			var idx;
			if (type == 'Array') {
				var arr = [];
				value.forEach((val, key, origin) => {
					if (typeof val === 'object' && ~(idx = __ref_cache.indexOf(val))) {
						return;
					}
					if (typeof val === 'object') {
						__ref_cache.push(val);
					}
					if (utls.filter(val, callback, key, origin)) {
						arr.push(val);
					}
					if (typeof val === 'object') {
						__ref_cache.pop();
					}
				});
				return arr;
			} else if (type == 'Object') {
				var obj = {};
				for (var k in value) {
					if (typeof value[k] === 'object' && ~(idx = __ref_cache.indexOf(value[k]))) {
						return;
					}
					if (typeof value[k] === 'object') {
						__ref_cache.push(value[k]);
					}
					if (utls.filter(value[k], callback, k, value)) {
						obj[k] = value[k];
					}
					if (typeof value[k] === 'object') {
						__ref_cache.pop();
					}
				}
				return obj;
			} else {
				return callback(value, key, origin);
			}
		}

		return filter(value, callback, key, origin);
	}
}
/**
 * Adds type handler
 * @param {*} cls
 * @param {Function} handler
 */
utls.vcopy.addHandler = function vcopy_addHandler(cls, handler) {
	__vcopy_handlers[utls.getType(cls)] = {
		cls : cls,
		handler : handler
	};
};
utls.vcopy.addHandler(Date, (cls, value) => {
	return new cls(value.getTime());
});
module.exports = utls;