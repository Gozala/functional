"use strict";

var slicer = Array.prototype.slice

module.exports = wrap

function wrap(lambda, wrapper) {
  /**
  Returns the first function passed as an argument to the second,
  allowing you to adjust arguments, run code before and after, and
  conditionally execute the original function.

  ## Example

    var hello = function(name) { return "hello: " + name }
    hello = wrap(hello, function(f) {
      return "before, " + f("moe") + ", after"
    })

    hello()   // => "before, hello: moe, after"
  **/

  return function wrapped() {
    var params = slicer.call(arguments)
    params.unshift(lambda)
    return wrapper.apply(this, params)
  }
}
