"use strict";
/**
 *
 */
class utls {
	/**
	 * getType
	 *
	 * Returns type of given value or name of function/object.
	 * @param {any} value
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
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	/**
	 * lcFirst
	 *
	 * Returns a string with the first character of string, lowercased if that character is alphabetic.
	 * @param {string} string
	 * @return {string}
	 */
	static lcFirst(string) {
		return string.charAt(0).toLowerCase() + string.slice(1);
	}

	/**
	 * camelCase
	 *
	 * Returns a camel-cased string. Word boundaries are "\b", "-", "_", " "
	 * @param {string} string
	 * @returns {string}
	 */
	static camelCase(string) {
		return (string || '').toLowerCase().replace(/(-|\s|_)./g, function (m) {
			return m.toUpperCase().replace(/-|\s|_/, '');
		});
	}

	/**
	 * fileExists
	 *
	 * Checks whether a file or directory exists
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
	 * @param {object} options
	 */
	static mkdir(path, options) {
		options = options || {};
		options.mode = options.mode || 0o775;
		options.parents = options.parents || true;
		let xpath = require('path');
		let fs = require('fs');
		let parts = path.split(xpath.sep);
		if(options.parents) {
			for (let i = 1; i < parts.length; i++) {
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
	 * rmdir
	 *
	 * @param {string} path
	 * @param {object} options
	 */
	static rmdir(path, options) {
		return true;
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
				if(!(destination[property] && destination[property].constructor && destination[property].constructor === Object)) {
					destination[property] = {};
				}
				utls.extend(destination[property], source[property]);
			} else {
				destination[property] = source[property];
			}
		}
		return destination;
	}
}
module.exports = utls;
