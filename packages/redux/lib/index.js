import { createContext, useReducer } from 'react';

export * from './store';

export const StoreContext = createContext();

export const createStore = (reducer, store = {}) => {
  const [ state, dispatch ] = useReducer(reducer, store);

  return {state, dispatch};
};

