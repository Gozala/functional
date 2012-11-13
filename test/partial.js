"use strict";

var partial = require("../partial")

exports["test curry function"] = function(assert) {
  var sum = function sum(b, c) { return this.a + b + c }

  var foo = { a : 5 }

  foo.sum7 = partial(sum, 7)
  foo.sum8and4 = partial(sum, 8, 4)

  assert.equal(foo.sum7(2), 14, "curry one arguments works")

  assert.equal(foo.sum8and4(), 17, "curry both arguments works")
}


if (require.main === module)
  require("test").run(exports)
