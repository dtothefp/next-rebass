import React from 'react';
import { shallow, mount } from 'enzyme';
import Item from '../Item';
describe('#Item', () => {
  const handleSubmit = jest.fn();
  const wrapper = mount(React.createElement(Item, {
    handleSubmit: handleSubmit
  }));
  it('incrementally emits data', () => {
    wrapper.find('form').simulate('submit');
    console.log(handleSubmit.mock.calls.length);
    expect(handleSubmit).toBeCalled();
  });
});