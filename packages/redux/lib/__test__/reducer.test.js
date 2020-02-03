import { advanceTo, clear } from 'jest-date-mock';
import { actions, constants, reducer } from '../';

const {
  addItems,
  filterItem,
  removeFilterItem,
  updateItem,
  changeItemView,
} = actions;

const {
  deliveryStates,
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED,
} = constants;
const {
  CREATED, COOKED
} = deliveryStates

describe(`#reducer`, () => {
  afterEach(() => {
    clear();
  });

  it(`adds and sorts items and keeps track of original order by ID`, () => {
    const timestamp = 1580749384642;

    advanceTo(timestamp);

    const idA = `A`;
    const idB = `B`;
    const itemA = {
      sent_at_second: 2,
      id: idA,
      event_name: CREATED
    };
    const itemB = {
      sent_at_second: 3,
      id: idB,
      event_name: CREATED
    };
    const newItems = [
      itemB,
      itemA
    ];
    let state = reducer({items: []}, addItems(newItems));

    expect(state.items).toEqual([itemA, itemB]);
    expect(state.order).toEqual([idA, idB]);

    const idC = `C`;
    const itemC = {
      sent_at_second: 5,
      id: idC,
      event_name: CREATED
    };
    const updatedItemA = {
      ...itemA,
      event_name: COOKED,
      sent_at_second: 10
    };

    state = reducer(state, addItems([itemC, itemB, updatedItemA]));

    expect(state.items).toEqual([{ ...updatedItemA , timestamp}, itemB, itemC]);
    expect(state.order).toEqual([idA, idB, idC]);
  });

  it(`adds an item filter`, () => {
    const state = reducer({filter: []}, filterItem(CREATED));

    expect(state).toEqual({
      filter: [CREATED]
    });
  });

  it(`removes an item filter`, () => {
    const state = reducer({filter: [CREATED]}, removeFilterItem(CREATED));

    expect(state).toEqual({
      filter: []
    });
  });

  it(`add an item to updating state`, () => {
    const id = `ID`;
    const state = reducer({updating: []}, updateItem({id}, UPDATE_ITEM));

    expect(state).toEqual({
      updating: [id]
    });
  });

  it(`removes item from updating state upon success`, () => {
    const id = `ID`;
    const state = reducer({updating: [id]}, updateItem({id}, UPDATE_ITEM_SUCCESS));

    expect(state).toEqual({
      updating: []
    });
  });

  it(`removes item from updating state upon failure`, () => {
    const id = `ID`;
    const state = reducer({updating: [id]}, updateItem({id}, UPDATE_ITEM_FAILED));

    expect(state).toEqual({
      updating: []
    });
  });

  it(`updates the item view`, () => {
    const viewA = `VIEW-A`;
    const viewB = `VIEW-B`;
    let state = reducer({}, changeItemView(viewA));

    expect(state).toEqual({
      view: viewA
    });

    state = reducer({}, changeItemView(viewB));

    expect(state).toEqual({
      view: viewB
    });
  });
});
