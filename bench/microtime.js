/**
 * @author Michał Żaloudik <michal.zaloudik@redcart.pl>
 */
"use strict";
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const utls = require('../');
function nop() {}
suite.add('nop', function () {
	nop();
}).add('microtime', function () {
	utls.microtime();
}).on('cycle', function (event) {
	console.log(String(event.target));
})/*.on('complete', function () {
	console.log('Fastest is ' + this.filter('fastest').map('name'));
})*/.run();