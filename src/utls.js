/**
 * @author Michał Żaloudik <michal.zaloudik@redcart.pl>
 */
"use strict";
/**
 * @type {{}}
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
	 * @return {string}
	 */
	static getType(value) {
		var type = /\[object ([^\]]*)]/.exec(Object.prototype.toString.call(value))[1];
		switch (type) {
			case 'Number':
				if (value % 1 !== 0) {
					type = 'Float';
				} else {
					type = 'Integer';
				}
				break;
			case 'Function':
				type = value.name.length ? value.name : type;
				break;
			case 'Object':
				type = value.constructor.name.length ? value.constructor.name : type;
				break;
			default:
				break;
		}
		return type;
	}

	/**
	 * Returns number of seconds since 1 January 1970 00:00:00 UTC.
	 * @return {number}
	 */
	static microtime() {
		return (new Date()).getTime() / 1000;
	}

	/**
	 * Returns a string with the first character of string capitalized, if that character is alphabetic.
	 * @param {string} string
	 * @return {string}
	 */
	static ucFirst(string) {
		return (string || '').charAt(0).toUpperCase() + string.slice(1);
	}

	/**
	 * Returns a string with the first character of string, lowercased if that character is alphabetic.
	 * @param {string} string
	 * @return {string}
	 */
	static lcFirst(string) {
		return (string || '').charAt(0).toLowerCase() + string.slice(1);
	}

	/**
	 * Returns a camel-cased string. Word boundaries are "\b", "-", "_", " "
	 * @param string
	 * @returns {string}
	 */
	static camelCase(string) {
		return (string || '').toLowerCase().replace(/(-|\s|_)./g, function (m) {
			return m.toUpperCase().replace(/-|\s|_/, '');
		});
	}

	/**
	 * Returns a pascal-cased string. Word boundaries are "\b", "-", "_", " "
	 * @param string
	 * @returns {string}
	 */
	static pascalCase(string) {
		return this.ucFirst(this.camelCase(string));
	}

	/**
	 * Checks whether a file or directory exists
	 * @throws {Error}
	 * @return {boolean}
	 */
	static fileExists(path) {
		if (!require('path').isAbsolute(path)) {
			throw new Error("Path must be absolute!");
		}
		try {
			let fs = require('fs');
			fs.accessSync(fs.realpathSync(path), fs.F_OK);
		} catch (e) {
			return false;
		}
		return true;
	}

	/**
	 * Makes directory
	 * @param {string} path
	 * @throws {Error}
	 */
	static mkdir(path) {
		let xpath = require('path');
		if (!xpath.isAbsolute(path)) {
			throw new Error("Path must be absolute");
		}
		let fs = require('fs');
		let parts = path.split(xpath.sep);
		for (let i = 1; i < parts.length; i++) {
			path = parts.slice(0, i).join(xpath.sep) + "/";
			if (!utls.fileExists(path)) {
				fs.mkdirSync(path);
			}
		}
	}

	/**
	 * Copy properties from source to destination object
	 * @param {object} destination
	 * @param {object} source
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
	 * @param promises
	 * @param initial
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
			let arr = [];
			value.map((val, key, origin) => {
				let res = utls.traverse(val, match, callback, key, origin);
				if (res !== undefined) {
					arr.push(res);
				}
			});
			if (arr.length) {
				return arr;
			}
		} else if (utls.getType(value) == 'Object') {
			var obj = {};
			Object.getOwnPropertyNames(value).forEach((key) => {
				let res = utls.traverse(value[key], match, callback, key, value);
				if (res !== undefined) {
					obj[key] = res;
				}
			});
			if (Object.getOwnPropertyNames(obj).length) {
				return obj;
			}
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
		function arrays(first, second) {
			if (first === second) {
				return true;
			}
			if (first.length !== second.length) {
				return false;
			}
			var length = first.length;
			for (var i = 0; i < length; i++) {
				if (first[i] instanceof Array && second[i] instanceof Array) {
					if (!arrays(first[i], second[i])) {
						return false;
					}
				} else if (first[i] instanceof Object && second[i] instanceof Object) {
					if (!objects(first[i], second[i])) {
						return false;
					}
				} else {
					if (first[i] !== second[i]) {
						return false;
					}
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
			if (firstPropsLength !== secondProps.length) {
				return false;
			}
			if (!arrays(firstProps, secondProps)) {
				return false;
			}
			for (var i = 0; i < firstPropsLength; i++) {
				var key = firstProps[i];
				if (first[key] instanceof Array && second[key] instanceof Array) {
					if (!arrays(first[key], second[key])) {
						return false;
					}
				} else if (first[key] instanceof Object && second[key] instanceof Object) {
					if (!objects(first[key], second[key])) {
						return false;
					}
				} else {
					if (first[key] !== second[key]) {
						return false;
					}
				}
			}
			return true;
		}

		if (first instanceof Array && second instanceof Array) {
			return arrays(first, second);
		} else if (first instanceof Object && second instanceof Object) {
			return objects(first, second);
		} else {
			return false;
		}
	}

	/**
	 * Makes copy of value (dereferences object values)
	 *
	 * @param {*} value
	 * @returns {*}
	 */
	static vcopy(value) {
		var copy;
		if (typeof value === 'object') {
			var type = utls.getType(value);
			if (type === 'Array') {
				copy = value.map((val) => {
					return utls.vcopy(val);
				});
			} else if (type === 'Object') {
				copy = {};
				Object.getOwnPropertyNames(value).forEach((key) => {
					copy[key] = utls.vcopy(value[key]);
				});
			} else if (typeof __vcopy_handlers[type] === 'object') {
				return __vcopy_handlers[type].handler(__vcopy_handlers[type].cls, value);
			} else {
				copy = value;
			}
		} else {
			copy = value;
		}
		return copy;
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
