"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

var _default = (state = {}, action) => {
  let items, updatedState, updatedFilter;

  switch (action.type) {
    case _constants.ADD_ITEMS:
      items = [...action.items].sort((a, b) => a.sent_at_second - b.sent_at_second);
      updatedState = { ...state,
        items
      };
      break;

    case _constants.FILTER_ITEM:
      updatedFilter = [...state.filter, action.item.toUpperCase()];
      updatedState = { ...state,
        filter: updatedFilter
      };
      break;

    case _constants.REMOVE_FILTER_ITEM:
      updatedFilter = state.filter.filter(item => item !== action.item.toUpperCase());
      updatedState = { ...state,
        filter: updatedFilter
      };
      break;

    case _constants.UPDATE_ITEM:
      updatedState = { ...state,
        updating: [...state.updating, action.item.id]
      };
      break;

    case _constants.UPDATE_ITEM_SUCCESS:
      console.log(`*******`, action.item.id, state.updating.filter(({
        id
      }) => id !== action.item.id)); // TODO: WTD

      updatedState = { ...state,
        updating: state.updating.filter(({
          id
        }) => id === action.item.id)
      };
      break;

    case _constants.UPDATE_ITEM_FAILED:
      updatedState = { ...state,
        updating: state.updating.filter(({
          id
        }) => id !== action.item.id)
      };
      break;

    case _constants.CHANGE_ITEM_VIEW:
      updatedState = { ...state,
        view: action.view
      };
      break;
  }

  if (process.env.NODE_ENV === `development`) {
    console.log(`***UPDATED_STATE***`, updatedState);
  }

  return updatedState;
};

exports.default = _default;