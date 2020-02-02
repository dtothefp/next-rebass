import React from 'react';
import { shallow, mount } from 'enzyme';
import { constants } from '@css/redux';
import Item from '../Item';
describe("#Item", () => {
  const {
    ACTIVE_VIEW,
    HISTORICAL_VIEW
  } = constants;
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
    console.log('*************', Item);
    const item = mount(React.createElement(Item, activeProps));
    expect(item).toMatchSnapshot();
  });
  it('renders a historical view', () => {});
  it('renders a loading state', () => {}); // it(`incrementally emits data`, () => {
  // wrapper.find(`form`).simulate(`submit`)
  // console.log(handleSubmit.mock.calls.length)
  // expect(handleSubmit).toBeCalled();
  // });
});