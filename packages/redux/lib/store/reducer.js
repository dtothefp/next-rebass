import {
  ADD_ITEMS,
  FILTER_ITEM,
  REMOVE_FILTER_ITEM,
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED,
  CHANGE_ITEM_VIEW
} from './constants';

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
      console.log('*******', action.item.id, state.updating.filter(({id}) => id !== action.item.id))


      // TODO: WTD
      updatedState = {
        ...state,
        updating: state.updating.filter(({id}) => id === action.item.id)
      };
      break;
    case UPDATE_ITEM_FAILED:
      updatedState = {
        ...state,
        updating: state.updating.filter(({id}) => id !== action.item.id)
      };
      break;
    case CHANGE_ITEM_VIEW:
      updatedState = {
        ...state,
        view: action.view
      };
      break;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('***UPDATED_STATE***', updatedState);
  }

  return updatedState;
}
