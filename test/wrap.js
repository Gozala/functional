"use strict";

var wrap = require("../wrap")

exports["test wrap"] = function(assert) {
  var greet = function(name) { return "hi: " + name }
  var backwards = wrap(greet, function(f, name) {
    return f(name) + " " + name.split("").reverse().join("")
  })

  assert.equal(backwards("moe"), "hi: moe eom",
               "wrapped the saluation function")

  var inner = function () { return "Hello " }
  var target = {
    name: "Matteo",
    hi: wrap(inner, function(f) { return f() + this.name })
  }

  assert.equal(target.hi(), "Hello Matteo", "works with this")

  function noop() { }
  var wrapped = wrap(noop, function(f) {
    return Array.prototype.slice.call(arguments)
  })

  var actual = wrapped([ "whats", "your" ], "vector", "victor")
  assert.deepEqual(actual, [ noop, ["whats", "your"], "vector", "victor" ],
                   "works with fancy stuff")
}

if (require.main === module)
  require("test").run(exports)
