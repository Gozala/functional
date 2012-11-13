"use strict";

var compose = require("../compose")

exports['test compose'] = function(assert) {
  var greet    = function(name){ return "hi: " + name; }
  var exclaim  = function(statement){ return statement + "!"; }
  var welcome = compose(exclaim, greet)
  assert.equal(welcome('moe'), 'hi: moe!', 'returned expected result')
}

if (require.main === module)
  require("test").run(exports)
