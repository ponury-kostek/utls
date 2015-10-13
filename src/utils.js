"use strict";
/**
 *
 */
class utils {
	/**
	 * @param {any} value
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
	 * @return {float}
	 */
	static microtime() {
		return (new Data()).getTime() / 1000;
	}

	/**
	 *
	 * @param {string }string
	 * @return {string}
	 */
	static ucfirst(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	/**
	 * File/directory exists
	 */
	static file_exists(path) {
		try {
			require('fs').accessSync(path, fs.F_OK);
		} catch (e) {
			return false;
		}
		return true;
	}
}
module.exports = utils;
