"use strict";
/**
 *
 */
class utls {
	/**
	 * getType
	 *
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
	 * microtime
	 *
	 * Returns number of seconds since 1 January 1970 00:00:00 UTC.
	 * @return {number}
	 */
	static microtime() {
		return (new Date()).getTime() / 1000;
	}

	/**
	 * ucFirst
	 *
	 * Returns a string with the first character of string capitalized, if that character is alphabetic.
	 * @param {string} string
	 * @return {string}
	 */
	static ucFirst(string) {
		return (string || '').charAt(0).toUpperCase() + string.slice(1);
	}

	/**
	 * lcFirst
	 *
	 * Returns a string with the first character of string, lowercased if that character is alphabetic.
	 * @param {string} string
	 * @return {string}
	 */
	static lcFirst(string) {
		return (string || '').charAt(0).toLowerCase() + string.slice(1);
	}

	/**
	 * camelCase
	 *
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
	 * pascalCase
	 *
	 * Returns a pascal-cased string. Word boundaries are "\b", "-", "_", " "
	 * @param string
	 * @returns {string}
	 */
	static pascalCase(string) {
		return this.ucFirst(this.camelCase(string));
	}

	/**
	 * fileExists
	 *
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
	 * mkdir
	 *
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
	 * extend
	 *
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
	 * promisesWaterfall
	 *
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
	 * traverse
	 *
	 * @param value
	 * @param match
	 * @param callback
	 * @returns {*}
	 */
	static traverse(value, match, callback) {
		if (match(value)) {
			return callback(value);
		} else if (utls.getType(value) == 'Array') {
			let arr = [];
			value.map((val) => {
				let res = utls.traverse(val, match, callback);
				if(res !== undefined) {
					arr.push(res);
				}
			});
			if(arr.length) {
				return arr;
			}
		} else if (utls.getType(value) == 'Object') {
			var obj = {};
			Object.getOwnPropertyNames(value).forEach((key) => {
				let res = utls.traverse(value[key], match, callback);
				if (res !== undefined) {
					obj[key] = res;
				}
			});
			if (Object.getOwnPropertyNames(obj).length) {
				return obj;
			}
		}
	}
}
module.exports = utls;
