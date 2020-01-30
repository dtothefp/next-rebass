import io from 'socket.io-client';
import { useEffect } from 'react';
import { createStore, StoreContext } from '@css/redux';
import { Container } from '@css/components';
import reducer from '../store/items/reducer';
import * as actions from '../store/items/actions';

export default () => {
  const initialState = {
    items: {},
    filter: []
  };
  const {state, dispatch} = createStore(reducer, initialState);

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('data', ({items}) => {
      dispatch(actions.addItems(items));
    });
  }, []);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      <Container />
    </StoreContext.Provider>
  );
};
