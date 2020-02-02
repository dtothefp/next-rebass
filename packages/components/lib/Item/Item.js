import { memo } from 'react';
import { Box, Button, Flex, Text } from 'rebass';
import { Input } from '@rebass/forms';
import icons from '@css/icons';
import styled from '@emotion/styled';
import styledC, { keyframes } from 'styled-components';

const eventKeys = [
  'CREATED',
  'COOKED',
  'DRIVER_RECEIVED',
  'DELIVERED',
  'CANCELLED'
];

const iconSvgs = eventKeys.reduce((acc, key) => {
  const Icon = styled(icons[key.toLowerCase()])`
    height: 35px;
    width: 35px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  `;

  return {
    ...acc,
    [key]: Icon
  };
}, {})

const iconDict = {
  CREATED: 'Order Created',
  COOKED: 'Cooked',
  DRIVER_RECEIVED: 'Driver Recieved',
  DELIVERED: 'Delivered',
  CANCELLED: 'Canceled'
};

const EventIcon = ({event}) => {
  const Icon = iconSvgs[event];

  return (
    <Box
      sx={{position: 'relative'}}
      >
      <Icon />
    </Box>
  );
};

const DataInput = ({disabled, handleChange, name, value}) => (
  <Box width="40%">
    <Input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      p={1}
      sx={{
        borderStyle: 'none',
      }}
      disabled={disabled}
    />
  </Box>
);

const animation = keyframes`
  0% { background-position-x: 100% }
  100% { background-position-x: 0% }
`;

const bgc = '#efefefef';

const Container = styledC(Box)`
  display: flex;
  height: 50px;
  padding: 10px;
  background-image: ${({idx}) => idx % 2 === 0 ? `linear-gradient(-45deg, ${bgc} 35%, white, ${bgc} 65%, ${bgc})` : 'none'};
  background-position-y: 50%;
  background-size: 300%;
  animation: 1.5s ${animation} infinite;
`;

export default memo(function Item({
  eventName,
  name,
  destination,
  disabled,
  handleChange,
  handleSubmit,
  idx,
  loading,
  view,
  updating,
}) {
  if (loading) {
    return <Container idx={idx} />;
  }

  const isHistorical = view === `historical`

  return (
    <Flex
      as="form"
      p={2}
      bg={idx % 2 === 0 ? 'gray' : false}
      onSubmit={handleSubmit}
    >
      <Box width="10%">
        <EventIcon event={eventName}/>
      </Box>
      <DataInput
        name="name"
        value={name}
        handleChange={handleChange}
        disabled={isHistorical || updating}
      />
      <DataInput
        name="destination"
        value={destination}
        handleChange={handleChange}
        disabled={isHistorical || updating}
      />
      <Box width="10%">
        <Button
          sx={{
            borderRadius: '0',
            cursor: 'pointer',
            display: isHistorical ? 'none' : false
          }}
          bg="muted"
          width="100%">Update</Button>
      </Box>
    </Flex>
  );
});
