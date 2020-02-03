import { useContext } from 'react';
import { Box, Card, Text } from 'rebass';
import { Checkbox, Input, Label } from '@rebass/forms';
import {
  actions,
  constants,
  StoreContext
} from '@css/redux';

const {
  filterItem,
  removeFilterItem,
  addTimeFilter,
} = actions;

const {deliveryStates: {COOKED}} = constants;

const FilterBox = () => {
  const {
    dispatch,
    state: {
      filter,
      time = ``,
    }
  } = useContext(StoreContext);
  const handleChange = (e) => {
    const {checked, name} = e.target;

    dispatch(
      checked ? filterItem(name) : removeFilterItem(name)
    );
  };
  const handleInputChange = (e) => {
    const {value} = e.target;

    if (isNaN(value)) return null;

    dispatch(addTimeFilter(value));
  };

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
          <Label
            sx={{
              borderStyle: `solid`,
              borderWidth: `1px`,
              borderLeft: `0`,
              borderRight: `0`,
              borderColor: `secondary`,
            }}
            py={2}
            pl={2}
          >
            <Checkbox
              name="created"
              onChange={handleChange}
              sx={{
                position: `relative`,
                top: `-4px`,
                backgroundColor: `transparent !important`,
              }}/>
            Created
          </Label>
          <Box>
          <Label
            py={2}
            pl={2}
          >
            <Checkbox
              name="cooked"
              onChange={handleChange}
              sx={{
                position: `relative`,
                top: `-4px`,
                backgroundColor: `transparent !important`,
              }}
            />Cooked</Label>
            <Label
              p={2}
              sx={{
                borderStyle: `solid`,
                borderWidth: `1px`,
                borderLeft: `0`,
                borderRight: `0`,
                borderBottom: `0`,
                borderColor: `secondary`,
                display: filter.includes(COOKED) ? false : `none !important`
              }}
            >
              <Input
                placeholder="elapsed time in seconds"
                type="number"
                name="cooked_time"
                height="25px"
                min="1"
                onChange={handleInputChange}
                value={time}
                sx={{
                  borderRadius: `0`,
                  borderColor: `gray`
                }}
              />
            </Label>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default FilterBox;
