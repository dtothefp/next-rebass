import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Text } from 'rebass';
import { Checkbox, Label } from '@rebass/forms';
import {
  actions,
  constants,
  StoreContext
} from '@css/redux';

const {
  filterItem,
  removeFilterItem,
} = actions;

const {HISTORICAL_VIEW} = constants;

const FilterInput = ({
  bottom,
  children,
  disabled,
  handleChange,
  name,
}) => (
    <Label
      sx={{
        borderStyle: `solid`,
        borderWidth: `1px`,
        borderLeft: `0`,
        borderRight: `0`,
        borderBottom: bottom ? false : `0`,
        borderColor: `secondary`,
      }}
      py={2}
      pl={2}
    >
      <Checkbox
        name={name}
        onChange={handleChange}
        disabled={disabled}
        sx={{
          position: `relative`,
          top: `-4px`,
          backgroundColor: `transparent !important`,
        }}/>
      {children}
    </Label>
);

FilterInput.propTypes = {
  bottom: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  name: PropTypes.string,
};

const FilterBox = () => {
  const {
    state: {view},
    dispatch
  } = useContext(StoreContext);
  const handleChange = ((e) => {
    const {checked, name} = e.target;

    dispatch(
      checked ? filterItem(name) : removeFilterItem(name)
    );
  });
  const disabled = view === HISTORICAL_VIEW;

  return (
    <Box
      sx={{
        position: `relative`,
      }}
      width={ 1/4 }
      pt={5}
      px={3}
    >
      <Card
        sx={{
          position: `fixed`,
          borderStyle: `solid`,
          borderWidth: `3px`,
          borderLeft: `0`,
          borderRight: `0`,
          borderColor: `secondary`,
        }}
        width="22%"
        p={0}
      >
        <Text
          py={3}
          pl={2}
          as="h5"
          fontSize={2}
        >Filter Orders By Status</Text>
        <Box
          as="form"
        >
          <FilterInput
            name="created"
            handleChange={handleChange}
            disabled={disabled}
          >Created</FilterInput>
          <FilterInput
            name="cooked"
            handleChange={handleChange}
            disabled={disabled}
            bottom
          >Cooked</FilterInput>
        </Box>
      </Card>
    </Box>
  );
}

export default FilterBox;
