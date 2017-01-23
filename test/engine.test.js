var chai = require('chai');
var engine = require('../build/engine');

let expect = chai.expect;

describe('Validating for non empty fields', function() {
	it('engine.required() should return true, if the field is empty', function() {
		let base = {
				bool: true
			},
			val1 = '',
			val2 = 'hello';
		expect(engine.required(base,val1)).to.equal(true);
		expect(engine.required(base,val2)).to.equal(false);
	});
});

describe('Validating for pattern matching fields', function() {
	it('engine.regex() should return true, if the field is not mathing the regex pattern', function() {
		let base = {
				pattern: /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/
			},
			val1 = 'hello',
			val2 = 'hello@gmail.com';
		expect(engine.regex(base,val1)).to.equal(true);
		expect(engine.regex(base,val2)).to.equal(false);
	});
});

describe('Validating for fields less than minimum character length', function() {
	it('engine.min() should return true, if the field is less than minimum character length', function() {
		let base = {
				count: 4
			},
			val1 = 'hi',
			val2 = 'hello';
		expect(engine.min(base,val1)).to.equal(true);
		expect(engine.min(base,val2)).to.equal(false);
	});
});

describe('Validating for fields greater than maximum character length', function() {
	it('engine.max() should return true, if the field is greater than maximum character length', function() {
		let base = {
				count: 8
			},
			val1 = 'hello world',
			val2 = 'hello';
		expect(engine.max(base,val1)).to.equal(true);
		expect(engine.max(base,val2)).to.equal(false);
	});
});

describe('Validating only numbers', function() {
	it('engine.isNumber() should return true, if the field is not a number', function() {
		let base = {},
			val1 = 'hello',
			val2 = 123;
		expect(engine.isNumber(base,val1)).to.equal(true);
		expect(engine.isNumber(base,val2)).to.equal(false);
	});
});

describe('Validating date fields', function() {
	it('engine.date() should return true, if the field is not a date', function() {
		let base = {
				format: 'yyyy/mm/dd'
			},
			val1 = 'hello',
			val2 = '2016/01/01';
		expect(engine.date(base,val1)).to.equal(true);
		expect(engine.date(base,val2)).to.equal(false);
	});
});