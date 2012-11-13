"use strict";

var once = require("../once")

exports["test once"] = function(assert) {
  var n = 0
  var increment = once(function() { n ++ })

  increment()
  increment()

  assert.equal(n, 1, "only incremented once")

  var target = { state: 0, update: once(function() { return this.state ++ }) }

  target.update()
  target.update()

  assert.equal(target.state, 1, "this was passed in and called only once")
}

if (require.main === module)
  require("test").run(exports)
