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
const {CREATED} = deliveryStates

describe('#reducer', () => {
  it('adds and sorts items', () => {
    const newItems = [{sent_at_second: 3}, {sent_at_second: 2}];
    const state = reducer({items: []}, addItems(newItems));


    expect(state).toEqual({
      items: [{sent_at_second: 2}, {sent_at_second: 3}]
    });
  });

  it('adds an item filter', () => {
    const state = reducer({filter: []}, filterItem(CREATED));

    expect(state).toEqual({
      filter: [CREATED]
    });
  });

  it('removes an item filter', () => {
    const state = reducer({filter: [CREATED]}, removeFilterItem(CREATED));

    expect(state).toEqual({
      filter: []
    });
  });

  it('add an item to updating state', () => {
    const id = 'ID';
    const state = reducer({updating: []}, updateItem({id}, UPDATE_ITEM));

    expect(state).toEqual({
      updating: [id]
    });
  });

  it('removes item from updating state upon success', () => {
    const id = 'ID';
    const state = reducer({updating: [id]}, updateItem({id}, UPDATE_ITEM_SUCCESS));

    expect(state).toEqual({
      updating: []
    });
  });

  it('removes item from updating state upon failure', () => {
    const id = 'ID';
    const state = reducer({updating: [id]}, updateItem({id}, UPDATE_ITEM_FAILED));

    expect(state).toEqual({
      updating: []
    });
  });

  if('updates the item view', () => {
    const viewA = 'VIEW-A';
    const viewB = 'VIEW-B';
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
