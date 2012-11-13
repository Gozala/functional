"use strict";

var curry = require("../curry")

exports["test curry defined numeber of arguments"] = function(assert) {
  var sum = curry(function(a, b) {
    return a + b
  })

  assert.equal(sum(2, 2), 4, "sum(2, 2) => 4")
  assert.equal(sum(2)(4), 6, "sum(2)(4) => 6")
}

exports["test curry unknown number of arguments"] = function(assert) {
   var sum = curry(function(a, b) {
    return Array.prototype.reduce.call(arguments, function(sum, number) {
      return sum + number
    }, 0)
  }, Infinity)

  assert.equal(sum(2, 2)(), 4, "sum(2, 2)() => 4")
  assert.equal(sum(2, 4, 5)(-3)(1)(), 9, "sum(2, 4, 5)(-3)(1)() => 9")
}

exports["test continuous currying"] = function(assert) {
  var sum = curry(function(a, b) {
    return a + b
  })
  var plus44 = sum(44)

  assert.equal(plus44(4), 48, "curried 44")
  assert.equal(plus44(12), 56, "continues to curry")
  assert.equal(sum(2)()(20), 22, "curried function is stateless")
}

if (require.main === module)
  require("test").run(exports)
