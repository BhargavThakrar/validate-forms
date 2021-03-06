"use strict";

var _baseValidation = require('./baseValidation');

var _baseValidation2 = _interopRequireDefault(_baseValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

	post: {},
	errData: [],

	/**
  * The very first function called to validate the form fields
  * @param  {json}   post          Form post data
  * @param  {json}   field_list    Set validation rules
  * @param  {string} errReturnType It tells the error format, just error messages or error messages with field name
  * @return {json}                 Returns a json with error code and error messages
  */
	validator: function (post, field_list, errReturnType) {
		let response = {};

		if (!errReturnType) {
			errReturnType = 'onlyError';
		}

		response = _baseValidation2.default.validator(post, field_list, errReturnType);
		return response;
	}

};