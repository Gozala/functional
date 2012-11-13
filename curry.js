"use strict";

var slicer = Array.prototype.slice

module.exports = curry

function currier(lambda, arity, params) {
  return function curried() {
    /**
    Function either continues curring of the arguments or executes function
    if desired arguments have being collected. If function curried is variadic
    then execution without arguments will finish curring and trigger function.
    **/

    var input = slicer.call(arguments)
    // Function will be executed if curried function is variadic and this is
    // invoked without any arguments.
    var execute = Infinity === arity && input.length === 0 
    // Prepend all curried arguments to the given arguments.
    if (params) input.unshift.apply(input, params)
    // If all expected number of arguments has being collected, or if function
    // is variadic and no arguments have being passed invoke a curried function.
    return (input.length >= arity || execute) ? lambda.apply(this, input) :
           // Otherwise continue curried.
           currier(lambda, arity, input)
  }
}

function curry(lambda, arity) {
  /**
  Returns function with implicit currying, which will continue currying until
  expected number of argument is collected. Expected number of arguments is
  determined by `lambda.length` unless it's 0. In later case function will be
  assumed to be variadic and will be curried until invoked with `0` arguments.
  Optionally `arity` of curried arguments can be overridden via second `arity`
  argument.

  ## Examples

     var sum = curry(function(a, b) {
       return a + b
     })
     console.log(sum(2, 2)) // 4
     console.log(sum(2)(4)) // 6

     var sum = curry(function() {
       return Array.prototype.reduce.call(arguments, function(sum, number) {
         return sum + number
       }, 0)
     })
     console.log(sum(2, 2)()) // 4
     console.log(sum(2, 4, 5)(-3)(1)()) // 9
  **/

  return currier(lambda, arity || lambda.length)
}
