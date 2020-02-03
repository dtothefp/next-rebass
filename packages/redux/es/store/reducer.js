import { ADD_ITEMS, FILTER_ITEM, REMOVE_FILTER_ITEM, UPDATE_ITEM, UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAILED, CHANGE_ITEM_VIEW } from './constants';
export default ((state = {}, action) => {
  let items, itemsDict, updatedState, updatedFilter, order;

  switch (action.type) {
    case ADD_ITEMS:
      order = state.order || [];
      itemsDict = [...action.items].sort((a, b) => a.sent_at_second - b.sent_at_second).reduce((acc, item) => {
        const {
          id
        } = item;

        if (!acc[id]) {
          acc[id] = [];
        }

        if (!order.includes(id)) {
          order.push(id);
        }

        acc[id].push(item);
        return acc;
      }, {});
      items = order.reduce((list, id) => [...list, itemsDict[id].sort((a, b) => b.sent_at_second - a.sent_at_second)[0]], []);
      updatedState = { ...state,
        items,
        order
      };
      break;

    case FILTER_ITEM:
      updatedFilter = [...state.filter, action.item.toUpperCase()];
      updatedState = { ...state,
        filter: updatedFilter
      };
      break;

    case REMOVE_FILTER_ITEM:
      updatedFilter = state.filter.filter(item => item !== action.item.toUpperCase());
      updatedState = { ...state,
        filter: updatedFilter
      };
      break;

    case UPDATE_ITEM:
      updatedState = { ...state,
        updating: [...state.updating, action.item.id]
      };
      break;

    case UPDATE_ITEM_SUCCESS:
      // TODO: WTD
      updatedState = { ...state,
        updating: state.updating.filter(id => id !== action.item.id)
      };
      break;

    case UPDATE_ITEM_FAILED:
      updatedState = { ...state,
        updating: state.updating.filter(id => id !== action.item.id)
      };
      break;

    case CHANGE_ITEM_VIEW:
      updatedState = { ...state,
        view: action.view
      };
      break;
  }

  if (process.env.NODE_ENV === "development") {
    console.log("***UPDATED_STATE***", updatedState);
  }

  return updatedState;
});