import {
  ADD_ITEMS,
  REMOVE_ITEM,
  FILTER_ITEM,
  REMOVE_FILTER_ITEM
} from './constants';

export const addItems = (items) => ({
  type: ADD_ITEMS,
  items
});

export const removeItem = (item) => ({
  type: REMOVE_ITEM,
  item
});

export const filterItem = (item) => ({
  type: FILTER_ITEM,
  item,
});

export const removeFilterItem = (item) => ({
  type: REMOVE_FILTER_ITEM,
  item
});
