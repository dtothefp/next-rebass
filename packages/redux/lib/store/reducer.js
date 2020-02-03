import {
  ADD_ITEMS,
  FILTER_ITEM,
  REMOVE_FILTER_ITEM,
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED,
  CHANGE_ITEM_VIEW,
  ADD_TIME_FILTER,
  deliveryStates
} from './constants';

const {COOKED} = deliveryStates;

export default (state = {}, action) => {
  let
    items,
    itemsDict,
    newItemsDict,
    updatedState,
    updatedFilter,
    order,
    sorted,
    timestamp;

  switch (action.type) {
    case ADD_ITEMS:
      timestamp = Date.now();
      order = state.order || [];
      sorted = [...action.items].sort((a, b) => a.sent_at_second - b.sent_at_second);
      ({itemsDict = {}} = state);

      newItemsDict = sorted.reduce((acc, item) => {
        const {id, event_name} = item;
        const itemList = itemsDict[id] || [];
        const events = itemList.map(({event_name}) => event_name);

        if (!events.includes(event_name)) {
          if (event_name === COOKED) {
            Object.assign(item, {timestamp});
          }

          if (!order.includes(id)) {
            order.push(id);
          }

          itemList.push(item);
        }

        return {
          ...acc,
          [id]: itemList,

        };
      }, {});

      items = order.reduce((list, id) => ([
        ...list,
        newItemsDict[id].sort((a, b) => b.sent_at_second - a.sent_at_second)[0]
      ]), []);

      updatedState = {
        ...state,
        items,
        itemsDict: newItemsDict,
        order,
      };
      break;
    case FILTER_ITEM:
      updatedFilter = [...state.filter, action.item.toUpperCase()];

      updatedState = {
        ...state,
        filter: updatedFilter,
      };
      break;
    case REMOVE_FILTER_ITEM:
      updatedFilter = state.filter.filter((item) => item !== action.item.toUpperCase());

      updatedState = {
        ...state,
        filter: updatedFilter,
      };
      break;
    case UPDATE_ITEM:
      updatedState = {
        ...state,
        updating: [...state.updating, action.item.id],
      };
      break;
    case UPDATE_ITEM_SUCCESS:
      // TODO: WTD
      updatedState = {
        ...state,
        updating: state.updating.filter((id) => id !== action.item.id),
      };
      break;
    case UPDATE_ITEM_FAILED:
      updatedState = {
        ...state,
        updating: state.updating.filter((id) => id !== action.item.id),
      };
      break;
    case CHANGE_ITEM_VIEW:
      updatedState = {
        ...state,
        view: action.view,
      };
      break;
      case ADD_TIME_FILTER:
        updatedState = {
          ...state,
          time: Number(action.interval),
        };
        break;
  }

  if (process.env.NODE_ENV === `development`) {
    console.log(`***UPDATED_STATE***`, updatedState);
  }

  return updatedState;
}
