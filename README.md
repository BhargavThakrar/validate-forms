[![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]]

### Import:
```javascript
import validation from 'validate-forms';
```

### Sample Call:
```javascript
/**
 * errReturnType could be 'onlyError' OR 'errorWithFields'
 * default errReturnType is 'onlyError'
 */
validation.validator(post,field_list,errReturnType);
```
#### Argument 1 => post: 
```javascript
/**
 * Post is a json of post values
 *   Sample:
 */
{
    field_name1: field_value1,
    field_name2: field_value2
}
```
#### Argument 2 => field_list:
```javascript
/**
 * List of fields to be validated
 *   Sample:
 */
'key': {
    field_name: 'field_name',
    options: {
        required: {
            bool: true,
            msg: 'Error message to be displayed on client'
        }
    }
},
'key': {
    field_name: 'field_name',
    options: {
        required: {
            bool: true,
            msg: 'Error message to be displayed on client'
        },
        regex: [
            {
                pattern: /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/,
                msg: 'Error message to be displayed on client'
            },
            ....
        ]
    }
},
...
```

### Supported Validations:
- required
- regex
- min
- max
- isNumber
- date
- custom functions

### Example usage for custom validations:
```javascript
'key': {
    field_name: 'field_name',
    options: {
        custom: [
            {
                matches: function(value) {
                    return !(value == '123456');
                },
                msg: 'Error message to be displayed on client'
            },
            {
                contains: function(value) {
                    return !(value.indexOf("@") > -1);
                },
                msg: 'Error message to be displayed on client'
            },
            ...
        ],
        min: {
            count: 4,
            msg: 'Error message to be displayed on client'
        },
        ...                           
    }            
},
...
```
> While creating custom validations please return true if there is a validaiotn error

### Validation output:
```javascript
/**
 * It returns the err_code, if its 1 there is a validation error else it returns 0
 * Two types of error response will be sent based on errReturnType passed
 * Sample:
 */
//There is an error
//If errReturnType passed is 'onlyError'
{
    "err_code" : 1,
    "data" : ['error message 1', 'error message 2']
};

//If errReturnType passed is 'errorWithFields'
{  
   "err_code" : 1,
   "data":{  
      "field name 1" : "error message 1",
      "field name 2" : "error message 2"
   }
}

//No error
{
    "err_code" : 0,
    "data" : []
};
```

[travis-url]: https://travis-ci.org/BhargavThakrar/validate-forms
[travis-image]: https://travis-ci.org/BhargavThakrar/validate-forms.svg?branch=master

[coveralls-url]: https://coveralls.io/github/BhargavThakrar/validate-forms
[coveralls-image]: https://coveralls.io/repos/github/BhargavThakrar/validate-forms/badge.svg?branch=master