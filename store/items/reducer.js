import {
  ADD_ITEMS,
  REMOVE_ITEM,
  FILTER_ITEM,
  REMOVE_FILTER_ITEM,
  deliveryStates
} from './constants';

const {CANCELLED, DELIVERED} = deliveryStates;
const removalStates = [CANCELLED, DELIVERED];

export default (state = {}, action) => {
  let items;

  switch (action.type) {
    case ADD_ITEMS:
      items = action.items.reduce((acc, item) => {
        const {id, ...rest} = item;
        const shouldRemoveItem = state[id] && removalStates.includes(item.event_name);

        if (!state[id] || !shouldRemoveItem) {
          acc[id] = rest;
        }

        return acc;
      }, {});

      return {
        ...state,
        items,
      };
      break;
    case REMOVE_ITEM:
      console.log('((()))', action);
      break;
    case FILTER_ITEM:
      console.log('((()))', action);
      break;
    case REMOVE_FILTER_ITEM:
      console.log('((()))', action);
      break;
  }
}
