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

const ViewButton = ({active, variant, children, handleClick}) => {
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
    })
  }

  return (
    <Button
      sx={sx}
      bg={active ? 'gray' : 'white'}
      color="black"
      width={1/2}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

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
      console.log('******done', err);

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

  if (filteredItems.length < 4) {
    for (let i = filteredItems.length; i < 4; i++) {
      filteredItems.push({loading: true});
    }
  }

  /* eslint-disable */

  return (
    <Box
        width={3/4}
    >
      <Box
        pt={5}
        sx={{
          position: 'relative',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderTop: '0',
          borderLeft: '0',
          borderRight: '0',
          borderColor: 'secondary'
        }}
      >
        <Flex
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
          }}
          height="100%"
          width="100%"
        >
          <ViewButton
            active={view === 'active'}
            handleClick={handleClick(`active`)}
          >Active Orders</ViewButton>
          <ViewButton
            active={view === 'historical'}
            handleClick={handleClick(`historical`)}>Historical Orders</ViewButton>
        </Flex>
      </Box>
      <Box
        sx={{
          position: 'relative',
          borderStyle: 'solid',
          borderWidth: '3px',
          borderTop: '0',
          borderLeft: '0',
          borderRight: '0',
          borderColor: 'secondary'
        }}
      >
        {filteredItems.map(({event_name, destination, name, id, sent_at_second, loading}, i) => (
          <Item
            key={loading ? `loading-${i}` : `${id}-${sent_at_second}`}
            idx={i}
            eventName={event_name}
            name={state[id]?.name || name}
            bg={i % 2 === 0 ? 'grey' : 'white'}
            destination={state[id]?.destination || destination}
            disabled={updating.includes(id)}
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
