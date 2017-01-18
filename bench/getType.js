/**
 * @author Michał Żaloudik <michal.zaloudik@redcart.pl>
 */
"use strict";
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const utls = require('../');
const fast = require('../src/fast');
class Test {
	constructor() {
		this.name = 'Okuloku';
	}
}
const values = [
	undefined,
	null,
	true,
	1,
	1.2,
	'string',
	[
		1,
		2,
		3
	],
	{
		a : 'a',
		b : 'b',
		c : 'c'
	},
	() => {
	},
	function a() {
	},
	Test,
	new Test(),
	new Date(),
	/a/,
	Symbol()
];
function nop() {
}
const length = values.length;
suite.add('nop', function () {
	nop();
}).add('utls.getType', function () {
	for (var i = 0; i < length; i++) {
		utls.getType(values[i]);
	}
}).add('fast.getType', function () {
	for (var i = 0; i < length; i++) {
		fast.getType(values[i]);
	}
}).on('cycle', function (event) {
	console.log(String(event.target));
}).on('complete', function () {
	console.log(1000 / this.filter('fastest')[0].hz);
	console.log('Fastest is ' + this.filter('fastest').map('name'));
}).run();