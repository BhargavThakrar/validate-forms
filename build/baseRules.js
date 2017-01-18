'use strict';

module.exports = {
	rules: {
		'email': {
			options: {
				required: {
					bool: true,
					msg: 'Email is required'
				},
				regex: [{
					pattern: /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/,
					msg: 'Email is invalid'
				}, {
					pattern: /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@!(?:quikr)+([\.][a-zA-Z0-9\-]+)+$/,
					msg: 'Email shoud not contain quikr domain'
				}]
			}
		},
		'password': {
			options: {
				required: {
					bool: true,
					msg: 'Password is required'
				},
				min: {
					count: 6,
					msg: 'Password should be atleast 6 characters long'
				},
				max: {
					count: 8,
					msg: 'Password should not be more than 8 characters long'
				}
			}
		}
	},

	get_rules: function () {
		"use strict";

		return this.rules;
	}
};