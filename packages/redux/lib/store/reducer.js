import {
  ADD_ITEMS,
  REMOVE_ITEM,
  FILTER_ITEM,
  REMOVE_FILTER_ITEM,
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED,
  deliveryStates
} from './constants';

const {CANCELLED, DELIVERED} = deliveryStates;
const removalStates = [CANCELLED, DELIVERED];

export default (state = {}, action) => {
  let items;

  switch (action.type) {
    case ADD_ITEMS:
      items = action.items
        .filter((item) => !removalStates.includes(item.event_name));

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
    case UPDATE_ITEM:
      return {
        ...state,
        updating: [...state.updating, action.item.id]
      };
      break;
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        updating: state.updating.filter(({id}) => id !== action.item.id)
      };
      break;
    case UPDATE_ITEM_FAILED:
      return {
        ...state,
        updating: state.updating.filter(({id}) => id !== action.item.id)
      };
      break;
  }
}
