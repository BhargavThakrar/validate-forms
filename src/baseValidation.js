"use strict";

import _ from 'lodash';
import engine from './engine';

module.exports = {

	post: {},
	errArr: [],
	errReturnType: 'onlyError',

	/**
	 * Setting stuffs into context
	 * @param  {json}   post               Form post data
	 * @param  {json}   user_field_list    Set validation rules
	 * @param  {string} errReturnType      It tells the error format, just error messages or error messages with field name
	 * @return {json}                      Returns a json with error code and error messages
	 */
	validator: function(post,user_field_list,errReturnType) {
		
		let response = {err_code : 0};
		this.errReturnType = errReturnType;

		if(this.errReturnType === 'errorWithFields') {
			this.errArr = {};
		}else {
			this.errArr = [];
		}

		this.post = post;
		this.perform_validation(user_field_list);

		if(!_.isEmpty(this.errArr)) {
			response = {err_code : 1,data : this.errArr};
		}
		
		return response;
	},

	/**
	 * Validating the post data against the rules specified
	 * @param  {json}   validations Validation Rules
	 * @return {void}
	 */
	perform_validation: function(validations) {

		for(let prop in validations) {
			if(validations.hasOwnProperty(prop)) {
				let field_name = validations[prop].field_name;
				let options = validations[prop].options;
				for(let rules in options) {
					if(options.hasOwnProperty(rules)) {
						if(typeof options.skip !== 'undefined' && options.skip === true) {
							continue;
						}
						if(typeof this.post[field_name] === 'undefined' && _.get(options,'required.bool') === true) {
							this.putError(prop,options.required.msg);
							break;
						}else if(rules === 'custom') {
							for (let i = 0; i < options[rules].length; i++) { 
								let custom = options[rules][i];
								let err = false;
								for(let p in custom) {
							    	if(typeof custom[p] === 'function') {
										err = custom[p](this.post[field_name]);
										if(err) {
											this.putError(prop,custom.msg);
											break;
										}
									}
							    }
							    if(err) {
							    	break;
							    }
							}
						}else if(typeof engine[rules] === 'function') {
							if(rules === 'regex') {
								for (let i = 0; i < options[rules].length; i++) {
									let regex = options[rules][i],
										err = engine[rules](regex,this.post[field_name]);
									if(err) {
										this.putError(prop,regex.msg);
										break;
									}
								}	
							}else {
								let err = engine[rules](options[rules],this.post[field_name]);
								if(err) {
									this.putError(prop,options[rules].msg);
									break;
								}
							}
						}
					}
				}
			}
		}
	},

	/**
	 * Generates the error format
	 * @param  {string} key field name
	 * @param  {msg}    msg Error message
	 * @return {void}
	 */
	putError: function(key,msg) {

		if(this.errReturnType === 'errorWithFields') {
			this.errArr[key] = msg;
		}else {
			this.errArr.push(msg);
		}
	}
};