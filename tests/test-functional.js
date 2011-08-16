/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true newcap: true undef: true es5: true node: true devel: true
         forin: true */
/*global define: true */

!(typeof define === "undefined" ? function ($) { $(require, exports, module) } : define)(function (require, exports, module, undefined) {

"use strict";

var functional = require("../functional")

exports['test compose'] = function(assert) {
  var greet    = function(name){ return "hi: " + name; }
  var exclaim  = function(statement){ return statement + "!"; }
  var welcome = functional.compose(exclaim, greet)
  assert.equal(welcome('moe'), 'hi: moe!', 'returned expected result')
}

exports['test curry defined numeber of arguments'] = function(assert) {
  var sum = functional.curry(function(a, b) {
    return a + b
  })

  assert.equal(sum(2, 2), 4, 'sum(2, 2) => 4')
  assert.equal(sum(2)(4), 6, 'sum(2)(4) => 6')
};

exports['test curry unknown number of arguments'] = function(assert) {
   var sum = functional.curry(function(a, b) {
    return Array.prototype.reduce.call(arguments, function(sum, number) {
      return sum + number
    }, 0)
  }, Infinity)

  assert.equal(sum(2, 2)(), 4, 'sum(2, 2)() => 4')
  assert.equal(sum(2, 4, 5)(-3)(1)(), 9, 'sum(2, 4, 5)(-3)(1)() => 9')
};

exports['test continuous currying'] = function(assert) {
  var sum = functional.curry(function(a, b) {
    return a + b
  })
  var plus44 = sum(44)

  assert.equal(plus44(4), 48, 'curried 44')
  assert.equal(plus44(12), 56, 'continues to curry')
  assert.equal(sum(2)()(20), 22, 'curried function is stateless')
}

if (module == require.main)
  require("test").run(exports)

});
