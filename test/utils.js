"use strict";
/**
 * @ignore
 */
var assert = require("assert");
var utils = require("../index.js");
/**
 * getType
 */
describe("getType", function () {
	/**
	 * getType Boolean
	 */
	describe("getType Boolean", function () {
		it('should return Boolean for true/false', function () {
			assert.equal(utils.getType(true), "Boolean");
			assert.equal(utils.getType(false), "Boolean");
		});
		it('should not return Boolean for 1', function () {
			assert.notEqual(utils.getType(1), "Boolean");
		});
		it('should not return Boolean for 1.23', function () {
			assert.notEqual(utils.getType(1.23), "Boolean");
		});
		it('should not return Boolean for "true"', function () {
			assert.notEqual(utils.getType("true"), "Boolean");
		});
		it('should not return Boolean for ["true"]', function () {
			assert.notEqual(utils.getType(['true']), "Boolean");
		});
		it('should not return Boolean for {prop : true}', function () {
			assert.notEqual(utils.getType({prop : true}), "Boolean");
		});
		it('should not return Boolean for function() { return true }', function () {
			assert.notEqual(utils.getType(function () {
				return true;
			}), "Boolean");
		});
	});
	/**
	 * getType Integer
	 */
	describe("getType Integer", function () {
		it('should return Integer for 0,1,-1', function () {
			assert.equal(utils.getType(0), "Integer");
			assert.equal(utils.getType(1), "Integer");
			assert.equal(utils.getType(-1), "Integer");
		});
		it('should not return Integer for true', function () {
			assert.notEqual(utils.getType(true), "Integer");
		});
		it('should not return Integer for 1.23', function () {
			assert.notEqual(utils.getType(1.23), "Integer");
		});
		it('should not return Integer for "true"', function () {
			assert.notEqual(utils.getType("true"), "Integer");
		});
		it('should not return Integer for ["true"]', function () {
			assert.notEqual(utils.getType(['true']), "Integer");
		});
		it('should not return Integer for {prop : true}', function () {
			assert.notEqual(utils.getType({prop : true}), "Integer");
		});
		it('should not return Integer for function() { return true }', function () {
			assert.notEqual(utils.getType(function () {
				return true;
			}), "Integer");
		});
	});
	/**
	 * getType Float
	 */
	describe("getType Float", function () {
		it('should return Float for 1.23, -1.23', function () {
			assert.equal(utils.getType(1.23), "Float");
			assert.equal(utils.getType(-1.23), "Float");
		});
		it('should not return Float for true', function () {
			assert.notEqual(utils.getType(true), "Float");
		});
		it('should not return Float for 1', function () {
			assert.notEqual(utils.getType(1), "Float");
		});
		it('should not return Float for "true"', function () {
			assert.notEqual(utils.getType("true"), "Float");
		});
		it('should not return Float for ["true"]', function () {
			assert.notEqual(utils.getType(['true']), "Float");
		});
		it('should not return Float for {prop : true}', function () {
			assert.notEqual(utils.getType({prop : true}), "Float");
		});
		it('should not return Float for function() { return true }', function () {
			assert.notEqual(utils.getType(function () {
				return true;
			}), "Float");
		});
	});
	/**
	 * getType String
	 */
	describe("getType String", function () {
		it('should return String for "", "string"', function () {
			assert.equal(utils.getType(""), "String");
			assert.equal(utils.getType("string"), "String");
		});
		it('should not return String for true', function () {
			assert.notEqual(utils.getType(true), "String");
		});
		it('should not return String for 1', function () {
			assert.notEqual(utils.getType(1), "String");
		});
		it('should not return String for 1.23', function () {
			assert.notEqual(utils.getType(1.23), "String");
		});
		it('should not return String for ["true"]', function () {
			assert.notEqual(utils.getType(['true']), "String");
		});
		it('should not return String for {prop : true}', function () {
			assert.notEqual(utils.getType({prop : true}), "String");
		});
		it('should not return String for function() { return true }', function () {
			assert.notEqual(utils.getType(function () {
				return true;
			}), "String");
		});
	});
	/**
	 * getType Array
	 */
	describe("getType Array", function () {
		it('should return Array for [], ["array"], new Array(), new Array("array")', function () {
			assert.equal(utils.getType([]), "Array");
			assert.equal(utils.getType(["array"]), "Array");
			assert.equal(utils.getType(new Array()), "Array");
			assert.equal(utils.getType(new Array("array")), "Array");
		});
		it('should not return Array for true', function () {
			assert.notEqual(utils.getType(true), "Array");
		});
		it('should not return Array for 1', function () {
			assert.notEqual(utils.getType(1), "Array");
		});
		it('should not return Array for 1.23', function () {
			assert.notEqual(utils.getType(1.23), "Array");
		});
		it('should not return Array for "true"', function () {
			assert.notEqual(utils.getType("true"), "Array");
		});
		it('should not return Array for {prop : true}', function () {
			assert.notEqual(utils.getType({prop : true}), "Array");
		});
		it('should not return Array for function() { return true }', function () {
			assert.notEqual(utils.getType(function () {
				return true;
			}), "Array");
		});
	});
	/**
	 * getType Function
	 */
	describe("getType Function", function () {
		it('should return Function for function() {}', function () {
			assert.equal(utils.getType(function() {}), "Function");

		});
		it('should not return Function for true', function () {
			assert.notEqual(utils.getType(true), "Function");
		});
		it('should not return Function for 1', function () {
			assert.notEqual(utils.getType(1), "Function");
		});
		it('should not return Function for 1.23', function () {
			assert.notEqual(utils.getType(1.23), "Function");
		});
		it('should not return Function for "true"', function () {
			assert.notEqual(utils.getType("true"), "Function");
		});
		it('should not return Function for ["true"]', function () {
			assert.notEqual(utils.getType(['true']), "Function");
		});
		it('should not return Function for {prop : true}', function () {
			assert.notEqual(utils.getType({prop : true}), "Function");
		});
	});
	/**
	 * getType Object
	 */
	describe("getType Object", function () {
		it('should return Object for {}, {prop : "value"}', function () {
			assert.equal(utils.getType({}), "Object");
			assert.equal(utils.getType({prop : 'value'}), "Object");

		});
		it('should not return Object for true', function () {
			assert.notEqual(utils.getType(true), "Object");
		});
		it('should not return Object for 1', function () {
			assert.notEqual(utils.getType(1), "Object");
		});
		it('should not return Object for 1.23', function () {
			assert.notEqual(utils.getType(1.23), "Object");
		});
		it('should not return Object for "true"', function () {
			assert.notEqual(utils.getType("true"), "Object");
		});
		it('should not return Object for ["true"]', function () {
			assert.notEqual(utils.getType(['true']), "Object");
		});
		it('should not return Object for function() { return true }', function () {
			assert.notEqual(utils.getType(function () {
				return true;
			}), "Object");
		});
	});
});
/**
 * ucfirst
 */
describe("ucfirst", function () {
	it('should return Ucfirst for ucfirst', function () {
		assert.equal(utils.ucfirst("ucfirst"), "Ucfirst");
	});
	it('should return Ósemka for ósemka', function () {
		assert.equal(utils.ucfirst("ósemka"), "Ósemka");
	});
	it('should return 1eet for 1eet', function () {
		assert.equal(utils.ucfirst("1eet"), "1eet");
	});
});
/**
 * file_exists
 */
describe("file_exists", function () {
	it('should return true for ./utils.js', function () {
		assert.equal(utils.file_exists(__dirname + "/utils.js"), true);
	});
	it('should return false for ./non_existing_file', function () {
		assert.equal(utils.file_exists(__dirname + "/non_existing_file"), false);
	});
	it('should return true for ./', function () {
		assert.equal(utils.file_exists(__dirname + "/"), true);
	});
});
