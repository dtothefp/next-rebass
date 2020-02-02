import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { constants, StoreContext } from '@css/redux';
import FilterBox from '../FilterBox';

const {Provider} = StoreContext;

describe('#FilterBox', () => {
  const dispatch = jest.fn();

  afterEach(() => {
    dispatch.mockClear();
  });

  it('renders', () => {
    expect(
      render(
        <Provider value={{dispatch}}>
          <FilterBox />
        </Provider>
      )
    ).toMatchSnapshot();
  });

  it('dispatches upon selecting checkboxes', () => {
    const wrapper = mount(
      <Provider value={{dispatch}}>
        <FilterBox />
      </Provider>
    );

    const created = wrapper.find('input[name="created"]');
    const cooked = wrapper.find('input[name="cooked"]');

    created.simulate('change');
    cooked.simulate('change');

    expect(dispatch.mock.calls.length).toBe(2);
    expect(dispatch.mock.calls[0][0].item).toBe('created');
    expect(dispatch.mock.calls[1][0].item).toBe('cooked');
  });
});
