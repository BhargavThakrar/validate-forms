import chai from 'chai';
import validation from '../src/Validation';

let expect = chai.expect;

describe('Validating an example form', function() {
	it('validation.validator() should return an object with error code 1 along with error message, if any of the field does not match the criteria', function() {
		let base = {
				firstName: {
					field_name: 'firstName',
					options: {
		                required: {
		                    bool: true,
		                    msg: 'Please enter your First name'
		                },
		            }
				},
				email: {
					field_name: 'email',
					options: {
		                required: {
		                    bool: true,
		                    msg: 'Please enter your email'
		                },
		                regex: [
		                    {
		                        pattern: /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/,
		                        msg: 'Email is invalid'
		                    }
		                ]
		            }
				},
				password: {
					field_name: 'password',
					options: {
		                min: {
		                    count: 8,
		                    msg: 'Password should be atleast 8 characters long'
		                },
		                max: {
		                    count: 16,
		                    msg: 'Password should not be more than 16 characters long'
		                },
		            }
				},
				age: {
					field_name: 'age',
					options: {
						isNumber: {
							msg: 'Invalid age'
						}
					}
				},
				dob: {
					field_name: 'dob',
					options: {
						date: {
							format: 'yyyy/mm/dd',
							msg: 'Invalid age'
						}
					}
				}				
			},
			formData1 = {
				firstName: '',
				email: 'bt6383@gmail.com',
				password: 12345678,
				age: 25,
				dob: '2000/01/01'
			},
			formData2 = {
				firstName: 'Bhargav',
				email: 'bt6383@gmailcom',
				password: 12345678,
				age: 25,
				dob: '2000/01/01'
			},
			formData3 = {
				firstName: 'Bhargav',
				email: 'bt6383@gmail.com',
				password: 123456,
				age: 25,
				dob: '2000/01/01'
			},		
			formData4 = {
				firstName: 'Bhargav',
				email: 'bt6383@gmail.com',
				password: 12345678,
				age: '25',
				dob: '2000/01/01'
			},
			formData5 = {
				firstName: 'Bhargav',
				email: 'bt6383@gmail.com',
				password: 12345678,
				age: 25,
				dob: '2000/14/01'
			};		
		
		expect(validation.validator(formData1, base)).to.have.property('err_code').to.equal(1);
		expect(validation.validator(formData2, base)).to.have.property('err_code').to.equal(1);
		expect(validation.validator(formData3, base)).to.have.property('err_code').to.equal(1);
		expect(validation.validator(formData4, base)).to.have.property('err_code').to.equal(1);
		expect(validation.validator(formData4, base)).to.have.property('err_code').to.equal(1);
		
	});
});

describe('Validating fields against custom validation functions', function() {
	it('validation.validator() should return true, if the field is not as expected by the custom validator function', function() {
		let base = {
				description: {
					field_name: 'description',
		            options: {
		                custom: [
		                    {
		                        wordCount: function(value) {
		                            return value.split(' ').length < 8;
		                        },
		                        msg: 'Please enter description of atleast 8 words'
		                    }
		                ]
		            }
				}
			},
			formData1 = {
				description: 'This package validates your form nicely!'
			},
			formData2 = {
				description: 'This package validates your form nicely! Use it wherever you can, Happy to help :)'
			};

		expect(validation.validator(formData1, base)).to.have.property('err_code').to.equal(1);
		expect(validation.validator(formData2, base)).to.have.property('err_code').to.equal(0);
	});
});