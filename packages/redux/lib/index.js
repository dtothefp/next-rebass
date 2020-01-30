import { createContext, useReducer, useContext } from 'react';

export const StoreContext = createContext();

export const Connect = (Component) => {
  return () => {
    const {state, dispatch} = useContext(StoreContext);

    return <Component state={state} />;
  };
};

export const createStore = (reducer, store = {}) => {
  const [ state, dispatch ] = useReducer(reducer, store);

  return {state, dispatch};
};
