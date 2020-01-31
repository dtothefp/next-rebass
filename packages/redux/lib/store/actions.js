import {
  ADD_ITEMS,
  REMOVE_ITEM,
  FILTER_ITEM,
  REMOVE_FILTER_ITEM,
  CHANGE_ITEM_VIEW,
} from './constants';

export const addItems = (items) => ({
  type: ADD_ITEMS,
  items
});

export const filterItem = (item) => ({
  type: FILTER_ITEM,
  item,
});

export const removeFilterItem = (item) => ({
  type: REMOVE_FILTER_ITEM,
  item
});

export const updateItem = (item, type) => ({
  type,
  item
});

export const changeItemView = (view) => ({
  type: CHANGE_ITEM_VIEW,
  view
});

