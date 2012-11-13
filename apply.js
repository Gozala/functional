"use strict";

var applier = Function.apply

module.exports = apply

function apply(lambda, params) {
  return applier.call(lambda, lambda, params)
}
