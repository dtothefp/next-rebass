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

const ViewButton = ({
  active,
  variant,
  children,
  handleClick
}) => {
  const sx = {
    cursor: 'pointer',
    borderRadius: '0'
  };

  if (active) {
    Object.assign(sx, {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderTop: '0',
      borderBottom: '0',
      borderColor: 'secondary'
    });
  }

  return _react.default.createElement(_rebass.Button, {
    sx: sx,
    bg: active ? 'gray' : 'white',
    color: "black",
    width: 1 / 2,
    onClick: handleClick
  }, children);
};

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
      console.log('******done', err);

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

  if (filteredItems.length < 4) {
    for (let i = filteredItems.length; i < 4; i++) {
      filteredItems.push({
        loading: true
      });
    }
  }
  /* eslint-disable */


  return _react.default.createElement(_rebass.Box, {
    width: 3 / 4
  }, _react.default.createElement(_rebass.Box, {
    pt: 5,
    sx: {
      position: 'relative',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderTop: '0',
      borderLeft: '0',
      borderRight: '0',
      borderColor: 'secondary'
    }
  }, _react.default.createElement(_rebass.Flex, {
    sx: {
      position: 'absolute',
      top: '0',
      left: '0'
    },
    height: "100%",
    width: "100%"
  }, _react.default.createElement(ViewButton, {
    active: view === 'active',
    handleClick: handleClick(`active`)
  }, "Active Orders"), _react.default.createElement(ViewButton, {
    active: view === 'historical',
    handleClick: handleClick(`historical`)
  }, "Historical Orders"))), _react.default.createElement(_rebass.Box, {
    sx: {
      position: 'relative',
      borderStyle: 'solid',
      borderWidth: '3px',
      borderTop: '0',
      borderLeft: '0',
      borderRight: '0',
      borderColor: 'secondary'
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
    bg: i % 2 === 0 ? 'grey' : 'white',
    destination: state[id]?.destination || destination,
    disabled: updating.includes(id),
    loading: loading,
    view: view,
    updating: updating.includes(id),
    handleChange: handleChange(id),
    handleSubmit: handleSubmit(id)
  }))));
};

exports.default = _default;