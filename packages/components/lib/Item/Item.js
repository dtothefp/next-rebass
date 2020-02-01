import { memo } from 'react';
import { Box, Button, Flex, Text } from 'rebass';
import { Input } from '@rebass/forms';

export default memo(function Item({
  eventName,
  name,
  destination,
  disabled,
  handleChange,
  handleSubmit,
  // bg
}) {
  return (
    <Flex as="form" onSubmit={handleSubmit}>
      <Box width="10%">
        <Text m={0}>{eventName}</Text>
      </Box>
      <Box width="40%">
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Box>
      <Box width="40%">
        <Input
          type="text"
          name="destination"
          value={destination}
          onChange={handleChange}
        />
      </Box>
      <Box width="10%">
        <Button
          sx={{borderRadius: '0'}}
          width="100%">Update</Button>
      </Box>
    </Flex>
  );
});
