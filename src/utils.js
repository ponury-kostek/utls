"use strict";
/**
 *
 */
class utils {
	/**
	 * getType
	 *
	 * Returns type of given value or name of function/object.
	 * @param {*} value
	 * @return {string}
	 */
	static getType(value) {
		var type = /\[object ([^\]]*)\]/.exec(Object.prototype.toString.call(value))[1];
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
				break;
			default:
				break;
		}
		return type;
	}

	/**
	 * microtime
	 *
	 * Returns number of milliseconds since 1 January 1970 00:00:00 UTC.
	 * @return {float}
	 */
	static microtime() {
		return (new Data()).getTime() / 1000;
	}

	/**
	 * ucfirst
	 *
	 * Returns a string with the first character of string capitalized, if that character is alphabetic.
	 * @param {string} string
	 * @return {string}
	 */
	static ucfirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	/**
	 * file_exists
	 *
	 * Checks whether a file or directory exists
	 * @return {boolean}
	 */
	static file_exists(path) {
		if(!require('path').isAbsolute(path)) {
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
}
module.exports = utils;
