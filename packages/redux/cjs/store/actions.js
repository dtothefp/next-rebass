"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeItemView = exports.updateItem = exports.removeFilterItem = exports.filterItem = exports.addItems = void 0;

var _constants = require("./constants");

const addItems = items => ({
  type: _constants.ADD_ITEMS,
  items
});

exports.addItems = addItems;

const filterItem = item => ({
  type: _constants.FILTER_ITEM,
  item
});

exports.filterItem = filterItem;

const removeFilterItem = item => ({
  type: _constants.REMOVE_FILTER_ITEM,
  item
});

exports.removeFilterItem = removeFilterItem;

const updateItem = (item, type) => ({
  type,
  item
});

exports.updateItem = updateItem;

const changeItemView = view => ({
  type: _constants.CHANGE_ITEM_VIEW,
  view
});

exports.changeItemView = changeItemView;