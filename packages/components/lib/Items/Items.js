import io from 'socket.io-client';
import { useState, useContext } from 'react';
import { actions, constants, StoreContext } from '@css/redux';
import { Box } from 'rebass';
import ItemsNav from '../ItemsNav/ItemsNav';
import Item from '../Item/Item';

const {HISTORICAL_VIEW} = constants;

const socket = io(process.env.SERVER_URL);
const {updateItem} = actions;
const {
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED,
} = constants;
const {deliveryStates} = constants;
const {
  DELIVERED,
  CANCELLED,
} = deliveryStates;
const inActiveStates = [DELIVERED, CANCELLED];

const Items = () => {
  const {
    dispatch,
    state: {items, updating, view, filter},
  } = useContext(StoreContext)
  const [state, setState] = useState({});
  const handleChange = (id) => (e) => {
    const {name, value} = e.target;

    setState((prevState) => ({
      ...prevState,
      [id]: {
        [name]: value,
      },
    }));
  };

  const handleSubmit = (id) => (e) => {
    e.preventDefault();

    const stateData = state[id];

    if (!stateData) return null;

    const data = {
      ...stateData,
      id,
    };

    const update = (type) => dispatch(
      updateItem(data, type)
    );

    update(UPDATE_ITEM)

    socket.emit(`update`, data, (err) => {

      if (err) {
        return update(UPDATE_ITEM_FAILED);
      }

      update(UPDATE_ITEM_SUCCESS);
    });
  };

  const filteredItems = items.filter(({event_name}) => {
    const isInactive = inActiveStates.includes(event_name);

    switch(view) {
      case HISTORICAL_VIEW:
        return isInactive;
        break;
      default:
        return filter.length ? filter.includes(event_name) : !isInactive;
        break;
    }
  });

  // Add some placeholder items for loading state
  if (filteredItems.length < 4) {
    for (let i = filteredItems.length; i < 4; i++) {
      filteredItems.push({loading: true});
    }
  }

  return (
    <Box
        width={3/4}
    >
      <ItemsNav />
      <Box
        sx={{
          position: `relative`,
          borderStyle: `solid`,
          borderWidth: `3px`,
          borderTop: `0`,
          borderLeft: `0`,
          borderRight: `0`,
          borderColor: `secondary`,
        }}
      >
        {filteredItems.map(({event_name, destination, name, id, sent_at_second, loading}, i) => (
          <Item
            key={loading ? `loading-${i}` : `${id}-${sent_at_second}`}
            idx={i}
            eventName={event_name}
            name={state[id]?.name || name}
            bg={i % 2 === 0 ? `grey` : `white`}
            destination={state[id]?.destination || destination}
            loading={loading}
            view={view}
            updating={updating.includes(id)}
            handleChange={handleChange(id)}
            handleSubmit={handleSubmit(id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Items;
