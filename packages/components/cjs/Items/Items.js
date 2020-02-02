"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _socket = _interopRequireDefault(require("socket.io-client"));

var _redux = require("@css/redux");

var _rebass = require("rebass");

var _ItemsNav = _interopRequireDefault(require("../ItemsNav/ItemsNav"));

var _Item = _interopRequireDefault(require("../Item/Item"));

const {
  HISTORICAL_VIEW
} = _redux.constants;
const socket = (0, _socket.default)(process.env.SERVER_URL);
const {
  updateItem
} = _redux.actions;
const {
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED
} = _redux.constants;
const {
  deliveryStates
} = _redux.constants;
const {
  DELIVERED,
  CANCELLED
} = deliveryStates;
const inActiveStates = [DELIVERED, CANCELLED];

const Items = () => {
  const {
    dispatch,
    state: {
      items,
      updating,
      view,
      filter
    }
  } = (0, _react.useContext)(_redux.StoreContext);
  const [state, setState] = (0, _react.useState)({});

  const handleChange = id => e => {
    const {
      name,
      value
    } = e.target;
    setState(prevState => ({ ...prevState,
      [id]: {
        [name]: value
      }
    }));
  };

  const handleSubmit = id => e => {
    e.preventDefault();
    const stateData = state[id];
    if (!stateData) return null;
    const data = { ...stateData,
      id
    };

    const update = type => dispatch(updateItem(data, type));

    update(UPDATE_ITEM);
    socket.emit(`update`, data, err => {
      if (err) {
        return update(UPDATE_ITEM_FAILED);
      }

      update(UPDATE_ITEM_SUCCESS);
    });
  };

  const filteredItems = items.filter(({
    event_name
  }) => {
    const isInactive = inActiveStates.includes(event_name);

    switch (view) {
      case HISTORICAL_VIEW:
        return isInactive;
        break;

      default:
        return filter.length ? filter.includes(event_name) : !isInactive;
        break;
    }
  }); // Add some placeholder items for loading state

  if (filteredItems.length < 4) {
    for (let i = filteredItems.length; i < 4; i++) {
      filteredItems.push({
        loading: true
      });
    }
  }

  return _react.default.createElement(_rebass.Box, {
    width: 3 / 4
  }, _react.default.createElement(_ItemsNav.default, null), _react.default.createElement(_rebass.Box, {
    sx: {
      position: `relative`,
      borderStyle: `solid`,
      borderWidth: `3px`,
      borderTop: `0`,
      borderLeft: `0`,
      borderRight: `0`,
      borderColor: `secondary`
    }
  }, filteredItems.map(({
    event_name,
    destination,
    name,
    id,
    sent_at_second,
    loading
  }, i) => _react.default.createElement(_Item.default, {
    key: loading ? `loading-${i}` : `${id}-${sent_at_second}`,
    idx: i,
    eventName: event_name,
    name: state[id]?.name || name,
    bg: i % 2 === 0 ? `grey` : `white`,
    destination: state[id]?.destination || destination,
    loading: loading,
    view: view,
    updating: updating.includes(id),
    handleChange: handleChange(id),
    handleSubmit: handleSubmit(id)
  }))));
};

var _default = Items;
exports.default = _default;