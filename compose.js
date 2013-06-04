"use strict";

var slicer = Array.prototype.slice

module.exports = compose
function compose() {
  /**
  Returns the composition of a list of functions, where each function
  consumes the return value of the function that follows. In math
  terms, composing the functions `f()`, `g()`, and `h()` produces
  `f(g(h()))`.
  Usage:
  
  var square = function(x) { return x * x }
  var increment = function(x) { return x + 1 }
  
  var f1 = compose(increment, square)
  f1(5) // => 26
  
  var f2 = compose(square, increment)
  f2(5) // => 36
  **/

  var lambdas = slicer.call(arguments)
  return function composed() {
    var params = slicer.call(arguments)
    var index = lambdas.length
    var result = [lambdas[--index].apply(this, params)]
    while (0 <= --index) result[0] = lambdas[index].apply(this, result)
    return result[0]
  }
}
