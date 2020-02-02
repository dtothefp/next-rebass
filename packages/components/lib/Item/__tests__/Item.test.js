import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { constants } from '@css/redux';
import Item from '../Item';

describe(`#Item`, () => {
  const {deliveryStates, ACTIVE_VIEW, HISTORICAL_VIEW} = constants;
  const {CREATED, DELIVERED} = deliveryStates;
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const idx = 1;
  const name = 'name';
  const destination = 'destination';
  const activeProps = {
    eventName: CREATED,
    handleChange,
    handleSubmit,
    idx,
    loading: false,
    updating: false,
    name,
    destination,
    view: ACTIVE_VIEW,
  };
  const historicalProps = {
    ...activeProps,
    view: HISTORICAL_VIEW,
    eventName: DELIVERED,
  };
  const loadingProps = {
    ...activeProps,
    loading: true,
  };

  afterEach(() => {
    handleChange.mockClear();
    handleSubmit.mockClear();
  });

  it('renders an active view', () => {
    const item = <Item {...activeProps} />;
    const wrapper = mount(item);
    const form = wrapper.find('form');

    expect(
      render(item)
    ).toMatchSnapshot();
    expect(form.children().length).toBe(4);
  });

  it('renders a historical view', () => {
    const item = <Item {...historicalProps} />;
    const wrapper = mount(item);
    const form = wrapper.find('form');


    expect(
      render(item)
    ).toMatchSnapshot();
    expect(form.children().length).toBe(3);
  });

  it('renders a loading state', () => {
    const wrapper = mount(<Item {...loadingProps} />);
    const form = wrapper.find('form');

    expect(form.children().length).toBe(0);
  });
});
