import React from "react";
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Flex } from 'rebass';
import { actions, constants, StoreContext } from '@css/redux';
const {
  changeItemView
} = actions;
const {
  ACTIVE_VIEW,
  HISTORICAL_VIEW
} = constants;

const ViewButton = ({
  selected,
  children,
  handleClick
}) => {
  const sx = {
    cursor: "pointer",
    borderRadius: "0"
  };

  if (selected) {
    Object.assign(sx, {
      borderStyle: "solid",
      borderWidth: "1px",
      borderTop: "0",
      borderBottom: "0",
      borderColor: "secondary"
    });
  }

  return React.createElement(Button, {
    sx: sx,
    bg: selected ? "gray" : "white",
    color: "black",
    width: 1 / 2,
    onClick: handleClick,
    disabled: selected
  }, children);
};

ViewButton.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
  handleClick: PropTypes.func
};

const ItemsNav = () => {
  const {
    dispatch,
    state: {
      view
    }
  } = useContext(StoreContext);

  const handleClick = view => () => {
    dispatch(changeItemView(view));
  };

  return React.createElement(Box, {
    pt: 5,
    sx: {
      position: "relative",
      borderStyle: "solid",
      borderWidth: "1px",
      borderTop: "0",
      borderLeft: "0",
      borderRight: "0",
      borderColor: "secondary"
    }
  }, React.createElement(Flex, {
    sx: {
      position: "absolute",
      top: "0",
      left: "0"
    },
    height: "100%",
    width: "100%"
  }, React.createElement(ViewButton, {
    selected: view === ACTIVE_VIEW,
    handleClick: handleClick(ACTIVE_VIEW)
  }, "Active Orders"), React.createElement(ViewButton, {
    selected: view === HISTORICAL_VIEW,
    handleClick: handleClick(HISTORICAL_VIEW)
  }, "Historical Orders")));
};

export default ItemsNav;