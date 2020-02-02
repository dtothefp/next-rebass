import React from 'react';
import { mount, render } from 'enzyme';
import { constants, StoreContext } from '@css/redux';
import ItemsNav from '../ItemsNav';

const {Provider} = StoreContext;
const {ACTIVE_VIEW, HISTORICAL_VIEW} = constants;

describe(`#ItemsNav`, () => {
  const dispatch = jest.fn();
  const state = {view: ACTIVE_VIEW}

  afterEach(() => {
    dispatch.mockClear();
  });

  it(`renders`, () => {
    expect(
      render(
        <Provider value={{dispatch, state}}>
          <ItemsNav />
        </Provider>
      )
    ).toMatchSnapshot();
  });

  it(`dispatches upon clicking enabled button`, () => {
    const wrapper = mount(
      <Provider value={{dispatch, state}}>
        <ItemsNav />
      </Provider>
    );

    const buttons = wrapper.find(`button`);
    const activeButton = buttons.first();
    const historicalButton = buttons.last();


    expect(buttons.length).toBe(2)
    // TODO: for some reason can't get the `disabled` attribute from DOM node can only get `prop` from React element
    expect(activeButton.props().disabled).toBeTruthy();
    expect(!historicalButton.props().disabled).toBeTruthy();

    historicalButton.simulate(`click`);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0].view).toBe(HISTORICAL_VIEW);
  });
});
