"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Item = _interopRequireDefault(require("../Item"));

describe('#Item', () => {
  const handleSubmit = jest.fn();
  const wrapper = (0, _enzyme.mount)(_react.default.createElement(_Item.default, {
    handleSubmit: handleSubmit
  }));
  it('incrementally emits data', () => {
    wrapper.find('form').simulate('submit');
    console.log(handleSubmit.mock.calls.length);
    expect(handleSubmit).toBeCalled();
  });
});