/*global describe, it, before, after, beforeEach, afterEach, mochaPhantomJS*/

define([
    'mocha'
], function (mocha) {
    'use strict';

    function bind (originFn) {
        return function (callback) {
            return originFn(callback.bind(this));
        };
    }

    return {
        /**
         * @type {string}
         * @protected
         */
        _name: '',

        /**
         * @protected
         */
        _initTests: function () {
            this.describe(this._name, function () {
                this._describe();
            });

            mocha.checkLeaks();

            if (typeof mochaPhantomJS !== 'undefined') {
                mochaPhantomJS.run();
            } else {
                mocha.run();
            }
        },

        /**
         * @param {string} description
         * @param {function} [callback]
         * @returns {*}
         */
        describe: function (description, callback) {
            return describe(description, callback ? callback.bind(this) : function () {
                it('Pending suite');
            });
        },

        /**
         * @param {string} description
         * @param {function} [callback]
         * @returns {*}
         */
        it: function (description, callback) {
            return it(description, callback && callback.bind(this));
        },

        before: bind(before),
        beforeEach: bind(beforeEach),
        after: bind(after),
        afterEach: bind(afterEach),

        /**
         * @protected
         * @abstract
         */
        _describe: function () {}
    };
});
