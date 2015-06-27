/*global describe, it, before, after, beforeEach, afterEach, mochaPhantomJS*/
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['mocha'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('mocha'), true);
    } else {
        root.mochaOOPWrapper = factory(root.mocha);
    }
}(this, function (mocha, itIsNode) {
    'use strict';

    if (!itIsNode) {
        mocha.setup('bdd');
    }

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

            if (itIsNode) {
                return;
            }

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
        _describe: function () {
        }
    };
}));
