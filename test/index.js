"use strict";

exports["test compose"] = require("./compose")
exports["test curry"] = require("./curry")
exports["test partial"] = require("./partial")
exports["test wrap"] = require("./wrap")
exports["test memoize"] = require("./memoize")
exports["test once"] = require("./once")



require("test").run(exports)
