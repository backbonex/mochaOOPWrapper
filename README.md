# mochaOOPWrapper
OOP wrapper for mocha test framework

## Installation
```bash
$ bower install mocha-oop-wrapper --save
```

## Usage
Specify path to [mocha](http://mochajs.org/) in your [requirejs](http://requirejs.org/) [config](http://requirejs.org/docs/api.html#config-shim) like this:
```js
requirejs.config({
    paths: {
        mocha: 'path/to/mocha'
    },
    shim: {
        mocha: {
            exports: 'mocha'
        }
    }
});
```
Create a class for testing. How it will look like depends on framework you are using. You can see example for [Backbone](http://backbonejs.org/) bellow
```js
define([
    'backbone',
    'expect', // you can use whatever you want
    'mochaOOPWrapper'
], function (Backbone, expect, mochaOOPWrapper) {
    'use strict';

    /**
     * Intermediate class based on mochaOOPWrapper
     * @class MochaOOPWrapper
     * @extends Backbone.View
     */
    var MochaOOPWrapper = Backbone.View.extend(mochaOOPWrapper);

    /**
     * @class MathTests
     * @extends MochaOOPWrapper
     */
    return MochaOOPWrapper.extend(/**@lends MathTests#*/{
        /**
         * Name of testing module
         * @type {string}
         * @protected
         */
        _name: 'MathTests',

        /**
         * @constructs
         */
        initialize: function () {
            Backbone.View.prototype.initialize.apply(this, arguments);
            
            // run tests after initialization
            this._initTests();
        },

        /**
         * Define here all the tests you want to run. Each test suite should be 
         * in separate method. All methods mentioned here will be bound to the 
         * test class context. Set a name for the suite as a name of entity you
         * are going to test there
         * @protected
         */
        _describe: function () {
            this.describe('+ operator', this._checkPlusOperator);
            this.describe('* operator', this._checkMultiplyOperator);
        },

        /**
         * Start names of methods for suites with `check` word and you will 
         * always distinguish them easily  
         * @private
         */
        _checkPlusOperator: function () {
            // Start test name with `should` verb for pretty output
            this.it('should add numbers', function () {
                expect(2 + 2).to.be(4);
                expect(4 + 3).to.be(7);
            });
        },

        /**
         * @private
         */
        _checkMultiplyOperator: function () {
            this.it('should multiply numbers', function () {
                expect(2 * 2).to.be(4);
                expect(4 * 3).to.be(12);
            });
        }
    });
});

```
