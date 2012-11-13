"use strict";

var memoize = require("../memoize")

exports["test memoize"] = function(assert) {
  function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2) }
  var fibnitro = memoize(fib)

  assert.equal(fib(10), 55,
        "a memoized version of fibonacci produces identical results")
  assert.equal(fibnitro(10), 55,
        "a memoized version of fibonacci produces identical results")

  function o(key, value) { return value }
  var oo = memoize(o), v1 = {}, v2 = {}


  assert.equal(oo(1, v1), v1, "returns value back")
  assert.equal(oo(1, v2), v1, "memoized by a first argument")
  assert.equal(oo(2, v2), v2, "returns back value if not memoized")
  assert.equal(oo(2), v2, "memoized new value")
  assert.notEqual(oo(1), oo(2), "values do not override")
  assert.equal(o(3, v2), oo(2, 3), "returns same value as un-memoized")

  var get = memoize(function(attribute) { return this[attribute] })
  var target = { name: "Bob", get: get }

  assert.equal(target.get("name"), "Bob", "has correct `this`")
  assert.equal(target.get.call({ name: "Jack" }, "name"), "Bob",
               "name is memoized")
  assert.equal(get("name"), "Bob", "once memoized can be called without this")
}

if (require.main === module)
  require("test").run(exports)
