import io from 'socket.io-client';
import { useState, useContext } from 'react';
import { actions, constants, StoreContext } from '@css/redux';
import { flexbox } from '@material-ui/system';
import styled from 'styled-components';

import Item from '../Item/Item';

const socket = io(process.env.SERVER_URL);

const {updateItem} = actions;

const {
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED
} = constants;

export default () => {
  const [state, setState] = useState({})
  const {
    dispatch,
    state: {items}
  } = useContext(StoreContext);
  const itemKeys = [
    `event_name`,
    `name`,
    `destination`,
    `button`
  ];
  const handleInputChange = (id, key) => (e) => {
    const {value} = e.target;

    setState((prevState) => ({
      ...prevState,
      [id]: {
        [key]: value
      }
    }));
  };
  const handleInputUpdate = (id) => (e) => {
    e.preventDefault();

    const updateData = {...state[id], id};
    const update = (type) => dispatch(updateItem(updateData, type));

    update(UPDATE_ITEM)

    socket.emit('update', updateData, (err) => {
      if (err) {
        return update(UPDATE_ITEM_FAILED);
      }

      update(UPDATE_ITEM_SUCCESS);
    });
  };

  const itemsList = items.reduce((list, item) => {
    itemKeys.forEach((itemKey, i) => {
      if (!Array.isArray(list[i])) list[i] = [];

      const {id, sent_at_second} = item;
      const key = id + sent_at_second + itemKey;
      const content = state[id] && state[id][itemKey] || item[itemKey];

      if (itemKey === `button`) {
        list[i].push(
          <div key={key}>
            <button onClick={handleInputUpdate(id)}>
              Update
            </button>
          </div>
        );
      } else {
        list[i].push(
          <Item
            handleInputChange={handleInputChange(id, itemKey)}
            content={content}
            key={key}
          />
        );
      }
    });

    return list;
  }, [])

  const ItemContainer = styled.div`
    display: flex;
    ${flexbox}
  `;

  return (
    <ItemContainer flexGrow={1}>
      {itemsList.map((list, i) => (
        <div key={`item-column-${i}`}>
          {list}
        </div>
      ))}
    </ItemContainer>
  );
};
