import React from "react";
import { memo } from 'react';
import { Box, Button, Flex, Text } from 'rebass';
import { Input } from '@rebass/forms';
export default memo(function Item({
  eventName,
  name,
  destination,
  disabled,
  handleChange,
  handleSubmit
}) {
  return React.createElement(Flex, {
    as: "form",
    onSubmit: handleSubmit
  }, React.createElement(Box, {
    width: 1 / 6
  }, React.createElement(Text, {
    m: 0
  }, eventName)), React.createElement(Box, {
    width: 1 / 3
  }, React.createElement(Input, {
    type: "text",
    name: "name",
    value: name,
    onChange: handleChange
  })), React.createElement(Box, {
    width: 1 / 3
  }, React.createElement(Input, {
    type: "text",
    name: "destination",
    value: destination,
    onChange: handleChange
  })), React.createElement(Box, {
    width: 1 / 6
  }, React.createElement(Button, null, "Update")));
});