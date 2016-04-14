'use strict';
class EnumElement {
  constructor(sourceEnum, value) {
    this._enum = sourceEnum;
    if (typeof value === 'string') {
      value = sourceEnum.valueOf(value);
    }
    this._value = value;
  }
  toString () {
    return this._enum.toString(this._value);
  }
  valueOf () {
    return this._value;
  }
}

class Enum {
  constructor(data) {
    this._internal = new Map();
    this._propertyMappings = new Map();

    Object.keys(data).forEach((key) => {
      this._internal.set(data[key][1], data[key][0]);
      this._propertyMappings.set(data[key][0], key);

      Object.defineProperty(this, key, {
        __proto__: null,
        enumerable: false,
        configurable: false,
        get: function () {
          return data[key][1];
        }
      });
    });
  }
  valueOf(stringValue) {
    return this._internal.get(stringValue);
  }
  toString(intValue) {
    var property = this._propertyMappings.get(intValue);
    return this[property];
  }
  values() {
    return Array.from(this._propertyMappings.values());
  }
  Element(value) {
    return new EnumElement(this, value);
  }
}
module.exports = Enum;