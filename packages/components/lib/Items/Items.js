import io from 'socket.io-client';
import { useState, useContext } from 'react';
import { actions, constants, StoreContext } from '@css/redux';
import { Box, Flex, Button } from 'rebass';
import Item from '../Item/Item';

const socket = io(process.env.SERVER_URL);
const {changeItemView, updateItem} = actions;
const {
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED
} = constants;
const {deliveryStates} = constants;
const {
  DELIVERED,
  CANCELLED
} = deliveryStates;
const inActiveStates = [DELIVERED, CANCELLED];

const ViewButton = ({active, variant, children, handleClick}) => (
    <Button
      sx={{
        borderRadius: '0 0 10px 10px',
        cursor: 'pointer'
      }}
      width={1/2}
      variant={variant}
      onClick={handleClick}
    >
      {children}
    </Button>
);

export default () => {
  const {
    dispatch,
    state: {items, updating, view, filter}
  } = useContext(StoreContext)
  const [state, setState] = useState({});
  const handleChange = (id) => (e) => {
    const {name, value} = e.target;

    setState((prevState) => ({
      ...prevState,
      [id]: {
        [name]: value
      }
    }));
  };

  const handleSubmit = (id) => (e) => {
    e.preventDefault();

    const stateData = state[id];

    if (!stateData) return null;

    const data = {
      ...stateData,
      id
    };

    const update = (type) => dispatch(
      updateItem(data, type)
    );

    update(UPDATE_ITEM)

    socket.emit('update', data, (err) => {
      if (err) {
        return update(UPDATE_ITEM_FAILED);
      }

      update(UPDATE_ITEM_SUCCESS);
    });
  };

  const handleClick = (view) => () => {
    dispatch(changeItemView(view));
  };

  const filteredItems = items.filter(({event_name}) => {
    const isInactive = inActiveStates.includes(event_name);

    switch(view) {
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

  return (
    <Box width={3/4} height="100vh">
      <Flex>
        <ViewButton
          variant='primary'
          handleClick={handleClick(`active`)}
        >Active Orders</ViewButton>
        <ViewButton
          variant='secondary'
          handleClick={handleClick(`historical`)}>Historical Orders</ViewButton>
      </Flex>
      {filteredItems.map(({event_name, destination, name, id, sent_at_second}, i) => (
        <Item
          key={`${id}-${sent_at_second}`}
          eventName={event_name}
          name={state[id]?.name || name}
          bg={i % 2 === 0 ? 'grey' : 'white'}
          destination={state[id]?.destination || destination}
          disabled={updating.includes(id)}
          handleChange={handleChange(id)}
          handleSubmit={handleSubmit(id)}
        />
      ))}
    </Box>
  );
};
