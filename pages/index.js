import io from 'socket.io-client';
import { useEffect } from 'react';
import { reducer, actions, createStore, StoreContext } from '@css/redux';
import { Container } from '@css/components';

export default () => {
  const initialState = {
    items: [],
    filter: [],
    updating: [],
  };
  const {state, dispatch} = createStore(reducer, initialState);

  useEffect(() => {
    const socket = io(process.env.SERVER_URL);

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
