"use strict";

var slicer = Array.prototype.slice

module.exports = partial
function partial(lambda) {
  /**
  Function composes new function out of given `lambda` with rest of the
  arguments curried.

  ## Example

      function sum(x, y) { return x + y }
      var inc = partial(sum, 1)

      inc(5) // => 6
  **/
  var curried = slicer.call(arguments, 1)
  return function partial() {
    var params = slicer.call(arguments)
    params.unshift.apply(params, curried)
    return lambda.apply(this, params)
  }
}
