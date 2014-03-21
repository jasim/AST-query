var assert = require('assert');
var Tree = require('../../');
var valueFactory = require('../../lib/factory/value.js');

var ObjectExpression = require('../../lib/nodes/ObjectExpression.js');
var Literal = require('../../lib/nodes/Literal.js');

describe('ObjectExpression objects', function () {
  beforeEach(function () {
    this.obj = new ObjectExpression(valueFactory.create('{ a: "b", foo: 1, bar: { sub: 1 } }'));
  });

  it('#type equal ObjectExpression', function () {
    assert.equal(this.obj.type, 'ObjectExpression');
  });

  describe('#key()', function () {
    it('get key value', function () {
      assert.equal(this.obj.key('a').value(), 'b');
    });

    it('returns a wrapped value', function () {
      assert(this.obj.key('a') instanceof Literal);
      assert(this.obj.key('bar') instanceof ObjectExpression);
      assert(this.obj.key('bar').key('sub') instanceof Literal);
    });
  });

  describe('#value()', function () {
    it('replace itself with new value', function () {
      var tree = new Tree('var b = { a: "b" };');
      tree.var('b').value().value('1');
      assert.equal(tree.toString(), 'var b = 1;');
    });

    it('return the new value', function () {
      var obj = this.obj.key('bar').value('"a"');
      assert(obj instanceof Literal);
    });
  });
});