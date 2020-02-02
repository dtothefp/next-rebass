import { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Flex } from 'rebass';
import { Input } from '@rebass/forms';
import icons from '@css/icons';
import styled from '@emotion/styled';
import styledC, { keyframes } from 'styled-components';
import { constants } from '@css/redux';

const eventKeys = [
  `CREATED`,
  `COOKED`,
  `DRIVER_RECEIVED`,
  `DELIVERED`,
  `CANCELLED`,
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
    [key]: Icon,
  };
}, {})

const EventIcon = ({event}) => {
  const Icon = iconSvgs[event];

  return (
    <Box
      sx={{position: `relative`}}
      >
      <Icon />
    </Box>
  );
};

EventIcon.propTypes = {
  event: PropTypes.string
};

const DataInput = ({
  disabled,
  handleChange,
  historical,
  name,
  value
}) => (
  <Box width={historical && name === 'destination' ? '50%' : '40%'}>
    <Input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      p={1}
      sx={{
        borderStyle: `none`,
      }}
      disabled={disabled}
    />
  </Box>
);


DataInput.propTypes = {
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  historical: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string
};

// HACK: doesn't seem easy to do keyframes in Rebass with Emotion so must use Styled Components. This isn't optimal because
// then we are bundling two styling libs.
// https://github.com/rebassjs/rebass/issues/309
// https://github.com/rebassjs/rebass/issues/309
const animation = keyframes`
  0% { background-position-x: 100% }
  100% { background-position-x: 0% }
`;

const bgc = `#efefefef`;
const calculateGradient = ({idx}) => idx % 2 === 0 ? `linear-gradient(-45deg, ${bgc} 35%, white, ${bgc} 65%, ${bgc})` : `none`;

const Container = styledC(Box)`
  display: flex;
  height: 50px;
  padding: 10px;
  background-image: ${calculateGradient};
  background-position-y: 50%;
  background-size: 300%;
  animation: 1.5s ${animation} infinite;
`;

const Item = memo(({
  destination,
  eventName,
  handleChange,
  handleSubmit,
  idx,
  loading,
  name,
  view,
  updating,
}) => {
  if (loading) {
    return <Container idx={idx} />;
  }

  const isHistorical = view === constants.HISTORICAL_VIEW;
  const disabled = isHistorical || updating

  return (
    <Flex
      as="form"
      p={2}
      bg={idx % 2 === 0 ? `gray` : false}
      onSubmit={handleSubmit}
    >
      <Box width="10%">
        <EventIcon event={eventName}/>
      </Box>
      <DataInput
        name="name"
        value={name}
        handleChange={handleChange}
        disabled={disabled}
        historical={isHistorical}
      />
      <DataInput
        name="destination"
        value={destination}
        handleChange={handleChange}
        disabled={disabled}
        historical={isHistorical}
      />
      {isHistorical ? null :
        <Box width="10%">
          <Button
            disabled={disabled}
            sx={{
              borderRadius: `0`,
              cursor: `pointer`,
            }}
            bg="muted"
            width="100%">Update</Button>
        </Box>
      }
    </Flex>
  );
});

Item.propTypes = {
  destination: PropTypes.string,
  eventName: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  idx: PropTypes.number,
  loading: PropTypes.bool,
  updating: PropTypes.bool,
  name: PropTypes.string,
  view: PropTypes.string,
};

export default Item;
