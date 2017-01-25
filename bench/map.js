/**
 * @author Michał Żaloudik <michal.zaloudik@redcart.pl>
 */
"use strict";
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const utls = require('../');
const fast = require('../src/fast');
const nestedObj = {
	a : 'a',
	b : 2,
	c : [
		1,
		2,
		3
	]
};
nestedObj.c.push('nestedObj');
const arr = [
	1,
	2,
	3,
	'a',
	'b',
	'c',
	[
		4,
		5,
		6,
		nestedObj
	],
	null,
	nestedObj,
	undefined,
	[
		[
			1,
			2,
			3,
			nestedObj
		],
		[
			[
				1,
				2,
				3,
				nestedObj
			]
		]
	]
];
function map(value, key) {
	/*if (typeof value === 'number') {
		value *= 2;
	}
	return value;*/
}
function nop() {
}
suite.add('nop', function () {
	nop();
}).add('utls.map', function () {
	utls.map(arr, map);
}).add('fast.map', function () {
	fast.map(arr, map);
}).on('cycle', function (event) {
	console.log(String(event.target));
}).on('complete', function () {
	console.log(1000 / this.filter('fastest')[0].hz);
	console.log('Fastest is ' + this.filter('fastest').map('name'));
}).run();