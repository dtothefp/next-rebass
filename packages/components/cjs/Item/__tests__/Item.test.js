"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _redux = require("@css/redux");

var _Item = _interopRequireDefault(require("../Item"));

describe(`#Item`, () => {
  const {
    ACTIVE_VIEW,
    HISTORICAL_VIEW
  } = _redux.constants;
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const idx = 1;
  const name = 'name';
  const destination = 'destination';
  const activeProps = {
    handleChange,
    handleSubmit,
    idx,
    loading: false,
    updating: false,
    name,
    destination,
    view: ACTIVE_VIEW
  };
  afterEach(() => {
    handleChange.mockClear();
    handleSubmit.mockClear();
  });
  it('renders an active view', () => {
    console.log('*************', _Item.default);
    const item = (0, _enzyme.mount)(_react.default.createElement(_Item.default, activeProps));
    expect(item).toMatchSnapshot();
  });
  it('renders a historical view', () => {});
  it('renders a loading state', () => {}); // it(`incrementally emits data`, () => {
  // wrapper.find(`form`).simulate(`submit`)
  // console.log(handleSubmit.mock.calls.length)
  // expect(handleSubmit).toBeCalled();
  // });
});