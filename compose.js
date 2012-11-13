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
  var greet = function(name) { return 'hi: ' + name }
  var exclaim = function(statement) { return statement + '!' }
  var welcome = compose(exclaim, greet)
  welcome('moe')
  // => 'hi: moe!'
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
