'use strict';
var esprima = require('esprima-fb');

/**
 * Function body node
 * @constructor
 * @private
 * @param {Object} node
 */
var Body = module.exports = function (node) {
  this.node = node;
};

/**
 * Append code to the function body
 * @param  {String} code
 * @return {this}
 */
Body.prototype.append = function (code) {
  var values = esprima.parse(code).body;
  Array.prototype.push.apply(this.node, values);
  return this;
};

/**
 * Prepend code to the function body
 * @param  {String} code
 * @return {this}
 */
Body.prototype.prepend = function (code) {
  var values = esprima.parse(code).body;
  var insertionIndex = 0;
  var nodes = this.node;

  // Ensure "use strict" declaration is kept on top
  if (nodes[0] && nodes[0].expression && nodes[0].expression.type === 'Literal'
    && nodes[0].expression.value === 'use strict') {
    insertionIndex = 1;
  }

  values.forEach(function (value, index) {
    // insertionIndex + index to insert the instruction in order
    nodes.splice(insertionIndex + index, 0, value);
  });

  return this;
};
