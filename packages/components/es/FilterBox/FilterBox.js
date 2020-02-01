import React from "react";
import { useContext } from 'react';
import { Box } from 'rebass';
import { Label, Checkbox } from '@rebass/forms';
import { actions, StoreContext } from '@css/redux';
const {
  filterItem,
  removeFilterItem
} = actions;
export default (() => {
  const {
    dispatch
  } = useContext(StoreContext);

  const handleInputChange = e => {
    const {
      checked,
      name
    } = e.target;
    dispatch(checked ? filterItem(name) : removeFilterItem(name));
  };

  return React.createElement(Box, {
    width: 1 / 4
  }, React.createElement("form", null, React.createElement(Label, null, React.createElement(Checkbox, {
    name: "created",
    onChange: handleInputChange
  }), "Created"), React.createElement(Label, null, React.createElement(Checkbox, {
    name: "cooked",
    onChange: handleInputChange
  }), "Cooked")));
});