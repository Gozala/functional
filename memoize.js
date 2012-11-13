"use strict";

module.exports = memoize
function memoize(lambda, hasher) {
  /**
  Memoizes a given function by caching the computed result. Useful for
  speeding up slow-running computations. If passed an optional hashFunction,
  it will be used to compute the hash key for storing the result, based on
  the arguments to the original function. The default hashFunction just uses
  the first argument to the memoized function as the key.
  **/

  var memo = {}
  return function memoizer(a) {
    var key = "@" + (hasher ? hasher.apply(this, arguments) : a)
    return key in memo ? memo[key] :
           (memo[key] = lambda.apply(this, arguments))
  }
}
