"use strict";

module.exports = once

// Simple identity used for identifying weather result is already accumulated
// or note.
var pending = {}

function once(lambda) {
  /**
  Creates a version of the function that can only be called one time. Repeated
  calls to the modified function will have no effect, returning the value from
  the original call. Useful for initialization functions, instead of having to
  set a boolean flag and then check it later.
  **/

  var result = pending
  return function f() {
    return result === pending ? (result = lambda.apply(this, arguments)) :
           result
  }
}
