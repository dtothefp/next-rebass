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
  return __jsx(Flex, {
    as: "form",
    onSubmit: handleSubmit
  }, __jsx(Box, {
    width: 1 / 6
  }, __jsx(Text, {
    m: 0
  }, eventName)), __jsx(Box, {
    width: 1 / 3
  }, __jsx(Input, {
    type: "text",
    name: "name",
    value: name,
    onChange: handleChange
  })), __jsx(Box, {
    width: 1 / 3
  }, __jsx(Input, {
    type: "text",
    name: "destination",
    value: destination,
    onChange: handleChange
  })), __jsx(Box, {
    width: 1 / 6
  }, __jsx(Button, null, "Update")));
});