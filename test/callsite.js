
/**
 * Module dependencies.
 */

var callsite = require('../');

describe('callsite', function(){
  it('should return an array of CallSites', function(){
    var stack = foo();
    stack[0].fun.should.equal(baz);
    stack[1].fun.should.equal(bar);
    stack[2].fun.should.equal(foo);

    function foo() {
      return bar();
    }

    function bar() {
      return baz();
    }

    function baz() {
      return callsite();
    }
  })

  it('should restore stack preparation', function(){
    callsite();
    new Error().stack.should.be.an.instanceOf(String)
  })

  it('should return line numbers', function(){
    var stack = callsite();
    stack[0].getLineNumber().should.eql(34);
  })
})
