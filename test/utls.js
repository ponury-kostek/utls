// TODO mkdir tests
"use strict";
/**
 * @ignore
 */
var assert = require("assert");
var utls = require("../index.js");
/**
 * getType
 */
describe("getType", () => {
	/**
	 * getType Boolean
	 */
	describe("getType Boolean", () => {
		it('should return Boolean for true/false', () => {
			assert.equal(utls.getType(true), "Boolean");
			assert.equal(utls.getType(false), "Boolean");
		});
		it('should not return Boolean for 1', () => {
			assert.notEqual(utls.getType(1), "Boolean");
		});
		it('should not return Boolean for 1.23', () => {
			assert.notEqual(utls.getType(1.23), "Boolean");
		});
		it('should not return Boolean for "true"', () => {
			assert.notEqual(utls.getType("true"), "Boolean");
		});
		it('should not return Boolean for ["true"]', () => {
			assert.notEqual(utls.getType(['true']), "Boolean");
		});
		it('should not return Boolean for {prop : true}', () => {
			assert.notEqual(utls.getType({prop : true}), "Boolean");
		});
		it('should not return Boolean for function() { return true }', () => {
			assert.notEqual(utls.getType(() => {
				return true;
			}), "Boolean");
		});
	});
	/**
	 * getType Integer
	 */
	describe("getType Integer", () => {
		it('should return Integer for 0,1,-1', () => {
			assert.equal(utls.getType(0), "Integer");
			assert.equal(utls.getType(1), "Integer");
			assert.equal(utls.getType(-1), "Integer");
		});
		it('should not return Integer for true', () => {
			assert.notEqual(utls.getType(true), "Integer");
		});
		it('should not return Integer for 1.23', () => {
			assert.notEqual(utls.getType(1.23), "Integer");
		});
		it('should not return Integer for "true"', () => {
			assert.notEqual(utls.getType("true"), "Integer");
		});
		it('should not return Integer for ["true"]', () => {
			assert.notEqual(utls.getType(['true']), "Integer");
		});
		it('should not return Integer for {prop : true}', () => {
			assert.notEqual(utls.getType({prop : true}), "Integer");
		});
		it('should not return Integer for function() { return true }', () => {
			assert.notEqual(utls.getType(() => {
				return true;
			}), "Integer");
		});
	});
	/**
	 * getType Float
	 */
	describe("getType Float", () => {
		it('should return Float for 1.23, -1.23', () => {
			assert.equal(utls.getType(1.23), "Float");
			assert.equal(utls.getType(-1.23), "Float");
		});
		it('should not return Float for true', () => {
			assert.notEqual(utls.getType(true), "Float");
		});
		it('should not return Float for 1', () => {
			assert.notEqual(utls.getType(1), "Float");
		});
		it('should not return Float for "true"', () => {
			assert.notEqual(utls.getType("true"), "Float");
		});
		it('should not return Float for ["true"]', () => {
			assert.notEqual(utls.getType(['true']), "Float");
		});
		it('should not return Float for {prop : true}', () => {
			assert.notEqual(utls.getType({prop : true}), "Float");
		});
		it('should not return Float for function() { return true }', () => {
			assert.notEqual(utls.getType(() => {
				return true;
			}), "Float");
		});
	});
	/**
	 * getType String
	 */
	describe("getType String", () => {
		it('should return String for "", "string"', () => {
			assert.equal(utls.getType(""), "String");
			assert.equal(utls.getType("string"), "String");
		});
		it('should not return String for true', () => {
			assert.notEqual(utls.getType(true), "String");
		});
		it('should not return String for 1', () => {
			assert.notEqual(utls.getType(1), "String");
		});
		it('should not return String for 1.23', () => {
			assert.notEqual(utls.getType(1.23), "String");
		});
		it('should not return String for ["true"]', () => {
			assert.notEqual(utls.getType(['true']), "String");
		});
		it('should not return String for {prop : true}', () => {
			assert.notEqual(utls.getType({prop : true}), "String");
		});
		it('should not return String for function() { return true }', () => {
			assert.notEqual(utls.getType(() => {
				return true;
			}), "String");
		});
	});
	/**
	 * getType Array
	 */
	describe("getType Array", () => {
		it('should return Array for [], ["array"], new Array(), new Array("array")', () => {
			assert.equal(utls.getType([]), "Array");
			assert.equal(utls.getType(["array"]), "Array");
			//noinspection JSPrimitiveTypeWrapperUsage
			assert.equal(utls.getType(new Array()), "Array");
			assert.equal(utls.getType(new Array("array")), "Array");
		});
		it('should not return Array for true', () => {
			assert.notEqual(utls.getType(true), "Array");
		});
		it('should not return Array for 1', () => {
			assert.notEqual(utls.getType(1), "Array");
		});
		it('should not return Array for 1.23', () => {
			assert.notEqual(utls.getType(1.23), "Array");
		});
		it('should not return Array for "true"', () => {
			assert.notEqual(utls.getType("true"), "Array");
		});
		it('should not return Array for {prop : true}', () => {
			assert.notEqual(utls.getType({prop : true}), "Array");
		});
		it('should not return Array for function() { return true }', () => {
			assert.notEqual(utls.getType(() => {
				return true;
			}), "Array");
		});
	});
	/**
	 * getType Function
	 */
	describe("getType Function", () => {
		it('should return Function for function() {}', () => {
			assert.equal(utls.getType(() => {
			}), "Function");
		});
		describe("getType named function", () => {
			it('should return NamedFunction for function NamedFunction() {}', () => {
				assert.equal(utls.getType(function NamedFunction() {
				}), "NamedFunction");
			});
		});
		it('should not return Function for true', () => {
			assert.notEqual(utls.getType(true), "Function");
		});
		it('should not return Function for 1', () => {
			assert.notEqual(utls.getType(1), "Function");
		});
		it('should not return Function for 1.23', () => {
			assert.notEqual(utls.getType(1.23), "Function");
		});
		it('should not return Function for "true"', () => {
			assert.notEqual(utls.getType("true"), "Function");
		});
		it('should not return Function for ["true"]', () => {
			assert.notEqual(utls.getType(['true']), "Function");
		});
		it('should not return Function for {prop : true}', () => {
			assert.notEqual(utls.getType({prop : true}), "Function");
		});
	});
	/**
	 * getType Object
	 */
	describe("getType Object", () => {
		it('should return Object for {}, {prop : "value"}', () => {
			assert.equal(utls.getType({}), "Object");
			assert.equal(utls.getType({prop : 'value'}), "Object");
		});
		describe("getType named object", () => {
			it('should return NamedObject for ', () => {
				class NamedObject {
				}
				assert.equal(utls.getType(new NamedObject()), "NamedObject");
			});
		});
		it('should not return Object for true', () => {
			assert.notEqual(utls.getType(true), "Object");
		});
		it('should not return Object for 1', () => {
			assert.notEqual(utls.getType(1), "Object");
		});
		it('should not return Object for 1.23', () => {
			assert.notEqual(utls.getType(1.23), "Object");
		});
		it('should not return Object for "true"', () => {
			assert.notEqual(utls.getType("true"), "Object");
		});
		it('should not return Object for ["true"]', () => {
			assert.notEqual(utls.getType(['true']), "Object");
		});
		it('should not return Object for function() { return true }', () => {
			assert.notEqual(utls.getType(() => {
				return true;
			}), "Object");
		});
	});
});
/**
 * microtime
 */
describe("microtime", () => {
	it('should return Float', () => {
		assert.equal(utls.getType(utls.microtime()), "Float");
	});
});
/**
 * ucFirst
 */
describe("ucFirst", () => {
	it('should return Ucfirst for ucfirst', () => {
		assert.equal(utls.ucFirst("ucfirst"), "Ucfirst");
	});
	it('should return Ósemka for ósemka', () => {
		assert.equal(utls.ucFirst("ósemka"), "Ósemka");
	});
	it('should return 1eet for 1eet', () => {
		assert.equal(utls.ucFirst("1eet"), "1eet");
	});
});
/**
 * lcFirst
 */
describe("lcFirst", () => {
	it('should return lcFirst for LcFirst', () => {
		assert.equal(utls.lcFirst("LcFirst"), "lcFirst");
	});
	it('should return ósemka for Ósemka', () => {
		assert.equal(utls.lcFirst("Ósemka"), "ósemka");
	});
	it('should return 1eet for 1eet', () => {
		assert.equal(utls.lcFirst("1eet"), "1eet");
	});
});
/**
 * camelCase
 */
describe("camelCase", () => {
	it('should return camelCase for camel case', () => {
		assert.equal(utls.camelCase("camel case"), "camelCase");
	});
	it('should return ósmaÓsemka for ósma-ósemka', () => {
		assert.equal(utls.camelCase("ósma-ósemka"), "ósmaÓsemka");
	});
	it('should return camelCase for CaMel CaSe', () => {
		assert.equal(utls.camelCase("CaMel CaSe"), "camelCase");
	});
});
/**
 * pascalCase
 */
describe("pascalCase", () => {
	it('should return CamelCase for pascal case', () => {
		assert.equal(utls.pascalCase("pascal case"), "PascalCase");
	});
	it('should return ÓsmaÓsemka for ósma-ósemka', () => {
		assert.equal(utls.pascalCase("ósma-ósemka"), "ÓsmaÓsemka");
	});
	it('should return PascalCase for pAsCaL CaSe', () => {
		assert.equal(utls.pascalCase("pAsCaL CaSe"), "PascalCase");
	});
});
/**
 * fileExists
 */
describe("fileExists", () => {
	it('should return true for ./utls.js', () => {
		assert.equal(utls.fileExists(__dirname + "/utls.js"), true);
	});
	it('should return false for ./non_existing_file', () => {
		assert.equal(utls.fileExists(__dirname + "/non_existing_file"), false);
	});
	it('should return true for ./', () => {
		assert.equal(utls.fileExists(__dirname + "/"), true);
	});
	it('should throw exception', () => {
		assert.throws(() => {
			utls.fileExists("./")
		}, Error);
	});
});
/**
 * extend
 */
describe("extend", () => {
	it('should return {foo : "foo", bar : "bar"}', () => {
		assert.deepEqual(utls.extend({foo : "foo"}, {bar : "bar"}), {
			foo : "foo",
			bar : "bar"
		});
	});
	it('should return {foo : "bar", bar : "bar"}', () => {
		assert.deepEqual(utls.extend({foo : "foo"}, {
			foo : "bar",
			bar : "bar"
		}), {
			foo : "bar",
			bar : "bar"
		});
	});
	it('should return {foo : "foo", bar : "bar"}', () => {
		assert.deepEqual(utls.extend({}, {
			foo : "foo",
			bar : "bar"
		}), {
			foo : "foo",
			bar : "bar"
		});
	});
	it('should return {foo : "foo", bar : "bar"}', () => {
		assert.deepEqual(utls.extend({
			foo : "foo",
			bar : "bar"
		}, {}), {
			foo : "foo",
			bar : "bar"
		});
	});
	it('should return {foo : "foo", bar : "bar"}', () => {
		assert.deepEqual(utls.extend(null, {
			foo : "foo",
			bar : "bar"
		}), {
			foo : "foo",
			bar : "bar"
		});
	});
	it('should return {foo : "foo", bar : "bar"}', () => {
		assert.deepEqual(utls.extend({
			foo : "foo",
			bar : "bar"
		}, null), {
			foo : "foo",
			bar : "bar"
		});
	});
	it('should return {foo : "foo", bar : "bar"}', () => {
		assert.deepEqual(utls.extend({foo : "foo"}, {
			"foo" : {"foo" : "bar"},
			bar : "bar"
		}), {
			foo : {"foo" : "bar"},
			bar : "bar"
		});
	});
	it('should return {foo : "bar", bar : "bar"}', () => {
		assert.deepEqual(utls.extend({
			foo : {"foo" : "foo"}
		}, {
			foo : {"foo" : "bar"},
			bar : "bar"
		}), {
			foo : {"foo" : "bar"},
			bar : "bar"
		});
	});
});
/**
 * mkdir
 */
describe("mkdir", () => {
	after(() => {
		require('child_process').execFileSync("rm", [
			"-rf",
			__dirname + "/a"
		]);
	});
	it('should create path ./a/b/c/', () => {
		utls.mkdir(__dirname + "/a/b/c/");
		assert.equal(utls.fileExists(__dirname + "/a/b/c/"), true);
	});
	it('should throw "Path must be absolute"', () => {
		assert.throws(() => {
			utls.mkdir("a/b/c/");
		}, Error, "Path must be absolute");
	});
});
/**
 * promisesWaterfall
 */
describe("promisesWaterfall", () => {
	function addA(val) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(val + 'a');
			}, 1);
		});
	}

	function addB(val) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(val + 'b');
			}, 2);
		});
	}

	function addC(val) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(val + 'c');
			}, 3);
		});
	}

	function crash() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Crashed");
			}, 4);
		});
	}

	it('should create "abc"', (done) => {
		var val = '';
		var promises = [
			addA,
			addB,
			addC
		];
		utls.promisesWaterfall(promises, Promise.resolve(val)).then((res) => {
			assert.equal(res, 'abc');
			done();
		}).catch((res) => {
			assert.equal(res, undefined);
			done();
		});
	});
	it('should create "cbbba"', (done) => {
		var val = '';
		var promises = [
			addC,
			addB,
			addB,
			addB,
			addA
		];
		utls.promisesWaterfall(promises, Promise.resolve(val)).then((res) => {
			assert.equal(res, 'cbbba');
			done();
		}).catch((res) => {
			assert.equal(res, undefined);
			done();
		});
	});
	it('should reject with "Crashed"', (done) => {
		var val = '';
		var promises = [
			addC,
			addB,
			crash,
			addB,
			addA
		];
		utls.promisesWaterfall(promises, Promise.resolve(val)).then((res) => {
			assert.equal(res, undefined);
			done();
		}).catch((res) => {
			assert.equal(res, "Crashed");
			done();
		});
	});
	it('should throws "Initial value must be Promise"', () => {
		var val = '';
		var promises = [addC];
		assert.throws(() => {
			utls.promisesWaterfall(promises, val);
		}, Error);
	});
});
describe('equals', () => {
	describe('invalid parameters', () => {
		it('', () => {
			assert.equal(utls.equals([
				1,
				2
			], [
				3,
				4
			]), false);
		});
		it('', () => {
			assert.equal(utls.equals({
				a : 1,
				b : 2
			}, {
				a : 3,
				b : 4
			}), false);
		});
		it('', () => {
			assert.equal(utls.equals([
				1,
				2,
				3
			], [
				1,
				2
			]), false);
		});
		it('', () => {
			assert.equal(utls.equals([
				1,
				2
			], 1), false);
		});
		it('', () => {
			assert.equal(utls.equals([
				1,
				2,
				3,
				[
					4,
					5,
					6,
					[
						7,
						8,
						9
					]
				]
			], [
				1,
				2,
				3,
				[
					4,
					5,
					6,
					[
						7,
						8,
						0
					]
				]
			]), false);
		});
		it('', () => {
			assert.equal(utls.equals({
				a : 1,
				b : 2,
				c : {
					d : 3,
					e : 4,
					f : {
						g : 5,
						h : 6
					}
				}
			}, {
				a : 1,
				b : 2,
				c : {
					d : 3,
					e : 4,
					f : {
						g : 5,
						h : 0
					}
				}
			}), false);
		});
		it('', () => {
			assert.equal(utls.equals({
				a : 1,
				b : 2,
				c : [
					1,
					2,
					3,
					{
						a : 1,
						b : 2,
						c : 'ce'
					}
				]
			}, {
				a : 1,
				b : 2,
				c : [
					1,
					2,
					3,
					{
						a : 1,
						b : 2,
						c : 'c'
					}
				]
			}), false);
		});
		it('', () => {
			assert.equal(utls.equals([
				1,
				2,
				3,
				{
					a : 'a',
					b : 'b'
				}
			], [
				1,
				2,
				3,
				{
					a : 'a',
					c : 'b'
				}
			]), false);
		});
		it('', () => {
			assert.equal(utls.equals({
				a : 'a',
				b : 'b'
			}, {a : 'a'}), false);
		});
	});
	describe('valid parameters', () => {
		it('', () => {
			assert.equal(utls.equals([
				1,
				2
			], [
				1,
				2
			]), true);
		});
		it('', () => {
			assert.equal(utls.equals({
				a : 1,
				b : 2
			}, {
				a : 1,
				b : 2
			}), true);
		});
		it('', () => {
			var a, b;
			a = b = [
				1,
				2,
				3
			];
			assert.equal(utls.equals(a, b), true);
		});
		it('', () => {
			var a, b;
			a = b = {
				a : 1,
				b : 2
			};
			assert.equal(utls.equals(a, b), true);
		});
		it('', () => {
			assert.equal(utls.equals([
				1,
				2,
				3,
				[
					4,
					5,
					6,
					[
						7,
						8,
						9
					]
				]
			], [
				1,
				2,
				3,
				[
					4,
					5,
					6,
					[
						7,
						8,
						9
					]
				]
			]), true);
		});
		it('', () => {
			assert.equal(utls.equals({
				a : 1,
				b : 2,
				c : {
					d : 3,
					e : 4,
					f : {
						g : 5,
						h : 6
					}
				}
			}, {
				a : 1,
				b : 2,
				c : {
					d : 3,
					e : 4,
					f : {
						g : 5,
						h : 6
					}
				}
			}), true);
		});
		it('', () => {
			assert.equal(utls.equals([
				1,
				2,
				3,
				{
					a : 'a',
					b : 'b'
				}
			], [
				1,
				2,
				3,
				{
					a : 'a',
					b : 'b'
				}
			]), true);
		});
		it('', () => {
			assert.equal(utls.equals({
				a : 1,
				b : 2,
				c : [
					1,
					2,
					3,
					{
						a : 1,
						b : 2,
						c : 'ce'
					}
				]
			}, {
				a : 1,
				b : 2,
				c : [
					1,
					2,
					3,
					{
						a : 1,
						b : 2,
						c : 'ce'
					}
				]
			}), true);
		});
	});
});