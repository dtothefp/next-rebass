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

var _Item = _interopRequireDefault(require("../Item/Item"));

const socket = (0, _socket.default)(process.env.SERVER_URL);
const {
  changeItemView,
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

var _default = () => {
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
    socket.emit('update', data, err => {
      if (err) {
        return update(UPDATE_ITEM_FAILED);
      }

      update(UPDATE_ITEM_SUCCESS);
    });
  };

  const handleClick = view => () => {
    dispatch(changeItemView(view));
  };

  const filteredItems = items.filter(({
    event_name
  }) => {
    const isInactive = inActiveStates.includes(event_name);

    switch (view) {
      case `historical`:
        return isInactive;
        break;

      default:
        return filter.length ? filter.includes(event_name) : !isInactive;
        break;
    }
  });
  const sx = {
    cursor: 'pointer'
  };
  return _react.default.createElement(_rebass.Box, {
    width: 3 / 4,
    height: "100vh"
  }, _react.default.createElement(_rebass.Flex, null, _react.default.createElement(_rebass.Button, {
    sx: sx,
    width: 1 / 2,
    variant: "primary",
    onClick: handleClick(`active`)
  }, "View Active"), _react.default.createElement(_rebass.Button, {
    sx: sx,
    width: 1 / 2,
    variant: "secondary",
    onClick: handleClick(`historical`)
  }, "Button")), filteredItems.map(({
    event_name,
    destination,
    name,
    id,
    sent_at_second
  }) => _react.default.createElement(_Item.default, {
    key: `${id}-${sent_at_second}`,
    eventName: event_name,
    name: state[id]?.name || name,
    destination: state[id]?.destination || destination,
    disabled: updating.includes(id),
    handleChange: handleChange(id),
    handleSubmit: handleSubmit(id)
  })));
};

exports.default = _default;