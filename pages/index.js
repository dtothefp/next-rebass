import io from 'socket.io-client';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import {
  reducer,
  actions,
  constants,
  createStore,
  StoreContext
} from '@css/redux';
import { Header } from '@css/components';

const NoSSRComponent = dynamic(
  async () => {
    const {Container} = await import(`@css/components`);

    return Container;
  },
  {
    ssr: false,
  }
);

export default () => {
  const initialState = {
    items: [],
    filter: [],
    updating: [],
    view: constants.ACTIVE_VIEW,
  };
  const {state, dispatch} = createStore(reducer, initialState);

  useEffect(() => {
    const socket = io(process.env.SERVER_URL);

    socket.on(`data`, ({items}) => {
      dispatch(actions.addItems(items));
    });
  }, []);

  return (
    <StoreContext.Provider value={{state, dispatch}}>
      <Header />
      <NoSSRComponent />
    </StoreContext.Provider>
  );
};
