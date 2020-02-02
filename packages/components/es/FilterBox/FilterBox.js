import React from "react";
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Text } from 'rebass';
import { Checkbox, Label } from '@rebass/forms';
import { actions, StoreContext } from '@css/redux';
const {
  filterItem,
  removeFilterItem
} = actions;

const FilterInput = ({
  bottom,
  children,
  handleChange,
  name
}) => React.createElement(Label, {
  sx: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderLeft: "0",
    borderRight: "0",
    borderBottom: bottom ? false : "0",
    borderColor: "secondary"
  },
  py: 2,
  pl: 2
}, React.createElement(Checkbox, {
  name: name,
  onChange: handleChange,
  sx: {
    position: "relative",
    top: "-4px",
    backgroundColor: "transparent !important"
  }
}), children);

FilterInput.propTypes = {
  bottom: PropTypes.bool,
  children: PropTypes.node,
  handleChange: PropTypes.func,
  name: PropTypes.string
};

const FilterBox = () => {
  const {
    dispatch
  } = useContext(StoreContext);

  const handleChange = e => {
    const {
      checked,
      name
    } = e.target;
    dispatch(checked ? filterItem(name) : removeFilterItem(name));
  };

  return React.createElement(Box, {
    sx: {
      position: "relative"
    },
    width: 1 / 4,
    pt: 5,
    px: 3
  }, React.createElement(Card, {
    sx: {
      position: "fixed",
      borderStyle: "solid",
      borderWidth: "3px",
      borderLeft: "0",
      borderRight: "0",
      borderColor: "secondary"
    },
    width: "22%",
    p: 0
  }, React.createElement(Text, {
    py: 3,
    pl: 2,
    as: "h5",
    fontSize: 2
  }, "Filter Orders By Status"), React.createElement(Box, {
    as: "form"
  }, React.createElement(FilterInput, {
    name: "created",
    handleChange: handleChange
  }, "Created"), React.createElement(FilterInput, {
    name: "cooked",
    handleChange: handleChange,
    bottom: true
  }, "Cooked"))));
};

export default FilterBox;