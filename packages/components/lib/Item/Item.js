import io from 'socket.io-client';
import { useState, useContext } from 'react';
import { actions, constants, StoreContext } from '@css/redux';

const {updateItem} = actions;

const {
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAILED
} = constants;

const socket = io(process.env.SERVER_URL);

export default (props) => {
  const {dispatch} = useContext(StoreContext);
  const {name} = props;

  const [state, setState] = useState(name);

  console.log('****STATE NAME***', state);

  const handleChange = (e) => setState(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    const updateData = {...props, name: state};
    const update = (type) => dispatch(updateItem(updateData, type));

    update(UPDATE_ITEM)

    socket.emit('update', updateData, (err) => {
      if (err) {
        return update(UPDATE_ITEM_FAILED);
      }

      update(UPDATE_ITEM_SUCCESS);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={state} onChange={handleChange}/>
      <button>change</button>
    </form>
  );
};
