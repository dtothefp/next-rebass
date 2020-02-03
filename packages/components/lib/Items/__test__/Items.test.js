import React from 'react';
import { mount, render } from 'enzyme';
import { constants, StoreContext } from '@css/redux';
import {socket as socketMock} from 'socket.io-client';
import Items from '../Items';


const {Provider} = StoreContext;
const {deliveryStates, ACTIVE_VIEW, HISTORICAL_VIEW, UPDATE_ITEM} = constants;
const {CREATED, DELIVERED} = deliveryStates;

describe(`#Items`, () => {
  const dispatch = jest.fn();
  const state = {
    items: [],
    updating: [],
    filter: [],
    view: ACTIVE_VIEW,
  };

  afterEach(() => {
    dispatch.mockClear();
    socketMock.mockClear();
  });

  it(`renders`, () => {
    expect(
      render(
        <Provider value={{dispatch, state}}>
          <Items />
        </Provider>
      )
    ).toMatchSnapshot();
  });

  it.skip(`renders 4 loading components if no items data is present`, () => {
    // TODO: can't figure out how to select Styled Components without pre-defined classnames
    // to measure that the length of items is 4
    const wrapper = mount(
      <Provider value={{dispatch, state}}>
        <Items />
      </Provider>
    );

    expect(wrapper.children().length).toBe(4);
  });

  it(`allows updating active items`, () => {
    const name = `name`;
    const destination = `destination`;
    const id = `ID`;
    const items = [{
      event_name: CREATED,
      destination,
      name,
      id,
      sent_at_second: 1,
    }];
    const newState = { ...state, items };
    const wrapper = mount(
      <Provider value={{dispatch, state: newState}}>
        <Items />
      </Provider>
    );

    const nameInput = wrapper.find(`input[name="${name}"]`);
    const destInput = wrapper.find(`input[name="${destination}"]`);
    const form = wrapper.find(`form`);

    nameInput.getDOMNode().value = `update-name`;
    nameInput.simulate(`change`);

    destInput.getDOMNode().value = `update-dest`;
    destInput.simulate(`change`);

    form.simulate(`submit`);

    const itemData = {
      name: `update-name`,
      destination: `update-dest`,
      id
    };

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: UPDATE_ITEM,
      item: itemData
    });

    expect(socketMock.mock.calls[0][1]).toEqual(itemData);
  });

  it(`disables updating historical items`, () => {
    const name = `name`;
    const destination = `destination`;
    const id = `ID`;
    const view = HISTORICAL_VIEW;
    const items = [{
      event_name: DELIVERED,
      destination,
      name,
      id,
      sent_at_second: 1,
    }];
    const newState = {...state, items, view}
    const wrapper = mount(
      <Provider value={{dispatch, state: newState}}>
        <Items />
      </Provider>
    );

    const nameInput = wrapper.find(`input[name="${name}"]`).getDOMNode();
    const destInput = wrapper.find(`input[name="${destination}"]`).getDOMNode();

    expect(nameInput.disabled).toBeTruthy();
    expect(destInput.disabled).toBeTruthy();
  });
});
