import {
  ADD_ITEMS,
  REMOVE_ITEM,
  FILTER_ITEM,
  REMOVE_FILTER_ITEM,
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED,
  // deliveryStates
} from './constants';

// const {CANCELLED, DELIVERED} = deliveryStates;
// const removalStates = [CANCELLED, DELIVERED];

export default (state = {}, action) => {
  let items, updatedState, updatedFilter;

  switch (action.type) {
    case ADD_ITEMS:
      items = [...action.items].sort((a, b) => a.sent_at_second - b.sent_at_second);

      updatedState = {
        ...state,
        items,
      };
      break;
    case REMOVE_ITEM:
      console.log('((()))', action);
      break;
    case FILTER_ITEM:
      updatedFilter = [...state.filter, action.item.toUpperCase()];

      updatedState = {
        ...state,
        filter: updatedFilter
      };
      break;
    case REMOVE_FILTER_ITEM:
      updatedFilter = state.filter.filter((item) => item !== action.item.toUpperCase());

      updatedState = {
        ...state,
        filter: updatedFilter
      };
      break;
    case UPDATE_ITEM:
      updatedState = {
        ...state,
        updating: [...state.updating, action.item.id]
      };
      break;
    case UPDATE_ITEM_SUCCESS:
      updatedState = {
        ...state,
        updating: state.updating.filter(({id}) => id !== action.item.id)
      };
      break;
    case UPDATE_ITEM_FAILED:
      updatedState = {
        ...state,
        updating: state.updating.filter(({id}) => id !== action.item.id)
      };
      break;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('***UPDATED_STATE***', updatedState);
  }

  return updatedState;
}
