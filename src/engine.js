"use strict";

module.exports = {
	
	/*
	| All below functions returns true if there is a valiadtion error
	*/

	/**
	 * Checks for empty fields
	 * @param  {json}          valiadtion_info Validation rule
	 * @param  {string|number} field_value     Post data value
	 * @return {boolean}                 	   Returns true in case of error else, false
	 */
	required: function(valiadtion_info,field_value) {
		if(valiadtion_info.bool === true) {
			return ((typeof field_value === 'string') ? (field_value.trim() === '') : (field_value === ''));
		}
		return false;
	},

	/**
	 * Checks for fields matching regex patterns
	 * @param  {json}          valiadtion_info Validation rule
	 * @param  {string|number} field_value     Post data value
	 * @return {boolean}                 	   Returns true in case of error else, false
	 */
	regex: function(valiadtion_info,field_value) {
		return !(field_value.match(valiadtion_info.pattern));
	},

	/**
	 * Checks for fields not less than minimun number characters
	 * @param  {json}          valiadtion_info Validation rule
	 * @param  {string|number} field_value     Post data value
	 * @return {boolean}                 	   Returns true in case of error else, false
	 */
	min: function(valiadtion_info,field_value) {
		if(typeof field_value !== 'string') {
			field_value = field_value.toString();
		}

		return (field_value.length < valiadtion_info.count);
	},

	/**
	 * Checks for fields not greater than maximum number characters
	 * @param  {json}          valiadtion_info Validation rule
	 * @param  {string|number} field_value     Post data value
	 * @return {boolean}                 	   Returns true in case of error else, false
	 */
	max: function(valiadtion_info,field_value) {
		if(typeof field_value !== 'string') {
			field_value = field_value.toString();
		}

		return (field_value.length > valiadtion_info.count);
	},

	/**
	 * Checks for numbers only fields
	 * @param  {json}          valiadtion_info Validation rule
	 * @param  {number}        field_value     Post data value
	 * @return {boolean}                 	   Returns true in case of error else, false
	 */
	isNumber: function(valiadtion_info,field_value) {
		if(field_value === '') {
			return false;
		}

		return (field_value !== parseInt(field_value, 10) || field_value !== parseFloat(field_value, 10));
	},

	/**
	 * Checks for date fields
	 * @param  {json}          valiadtion_info Validation rule
	 * @param  {string}        field_value     Post data value
	 * @return {boolean}                 	   Returns true in case of error else, false
	 */
	date: function(valiadtion_info,field_value) {
		if(field_value === '' || !valiadtion_info.format) {
			return false;
		}

		if(typeof field_value !== 'string') {
			field_value = field_value.toString();
		}

		let seperator = '/';

		if(valiadtion_info.seperator) {
			seperator = valiadtion_info.seperator;
		}

		let breakDate = field_value.split(seperator),
			breakFormat = valiadtion_info.format.split(seperator);

		if(!breakDate || typeof breakDate !== 'object' || breakDate.length === 1) {
			return true;
		}

		let d1 = breakDate[0],
			d2 = breakDate[1],
			d3 = breakDate[2];

		if(this.validateDate(d1, this.whichDate(d1, breakFormat[0]))) {
			return true;
		}
		if(this.validateDate(d2, this.whichDate(d2, breakFormat[1]))) {
			return true;
		}
		if(this.validateDate(d3, this.whichDate(d3, breakFormat[2]))) {
			return true;
		}

		return false;
	},

	/**
	 * Returns which part of date it is, year, month or day
	 * @param  {string}        d        day or month or year, extracted from the date
	 * @param  {string}        format   Date format (yyyy/mm/dd, dd/mm/yyy, ...)
	 * @return {string}                 Returns a string: year or month or day
	 */
	whichDate: function(d, format) {
		switch(d.length) {
			case 4:
				if(format === 'yyyy') {
					return 'year';
				}
				break;
			case 2:
				if(format === 'mm') {
					return 'month';
				}
				if(format === 'dd') {
					return 'day';
				}
				break;
			default:
				return 'nad';
		}
	},

	/**
	 * Validating year or month or day one at a time
	 * @param  {string}        d          day or month or year, extracted from the date
	 * @param  {string}        whichDate  part of a date, year or month or day
	 * @return {boolean}                  Returns true in case of error else, false
	 */
	validateDate: function(d, whichDate) {
		switch(whichDate) {
			case 'year':
				if(d.toString().length !== 4 || d > new Date().getFullYear()) {
					return true;
				}
				break;
			case 'month':
				if(d > 12) {
					return true;
				}
				break;
			case 'day':
				if(d > 31) {
					return true;
				}
				break;
			default:
				return true;
		}
	}
};