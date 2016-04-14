'use strict';
const Enum = require('../lib'),
  expect = require('chai').expect;

describe('when testing enum', function () {
  before(function () {
    let enumData = {
      FIRST: [1, 'first'],
      SECOND: [2, 'second'],
      THIRD: [3, 'third']
    };
    this.enum = new Enum(enumData);
  });

  it('should have enum properties', function () {
    expect(this.enum).to.have.property('FIRST');
    expect(this.enum).to.have.property('SECOND');
    expect(this.enum).to.have.property('THIRD');
  });

  it('should resolve enum properties as strings', function () {
    expect(this.enum.FIRST).to.equal('first');
    expect(this.enum.SECOND).to.equal('second');
    expect(this.enum.THIRD).to.equal('third');
  });

  it('should resolve valueOf string', function () {
    expect(this.enum.valueOf(this.enum.FIRST)).to.equal(1);
  });

  it('should resolve string value of number', function () {
    expect(this.enum.toString(1)).to.equal('first');
  });

  it('should return values of enum', function () {
    var values = this.enum.values();
    expect(values).to.have.length(3);
    expect(values).to.contain('FIRST');
    expect(values).to.contain('SECOND');
    expect(values).to.contain('THIRD');
  });

  it('should return Enum Element by int', function () {
    var value = this.enum.Element(3);
    expect(value).to.have.deep.property('constructor.name').to.equal('EnumElement');
    expect(value.toString()).to.equal('third');
    expect(value.valueOf()).to.equal(3);
  });

  it('should create Enum element from string', function () {
    var value = this.enum.Element('third');
    expect(value.valueOf()).to.equal(3);
  });
});