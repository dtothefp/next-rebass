import { useContext } from 'react';
import { Box, Card, Text } from 'rebass';
import { Checkbox, Label } from '@rebass/forms';
import {
  actions,
  StoreContext
} from '@css/redux';

const {
  filterItem,
  removeFilterItem
} = actions;

const FilterBox = ({children, name, handleChange, top, bottom}) => (
    <Label
      sx={{
        borderStyle: 'solid',
        borderWidth: '1px',
        borderLeft: '0',
        borderRight: '0',
        borderBottom: bottom ? false : '0',
        borderColor: 'secondary'
      }}
      py={2}
      pl={2}
    >
      <Checkbox
        name={name}
        onChange={handleChange}
        sx={{
          position: 'relative',
          top: '-4px',
          backgroundColor: 'transparent !important',
        }}/>
      {children}
    </Label>
);

export default () => {
  const {dispatch} = useContext(StoreContext);
  const handleChange = ((e) => {
    const {checked, name} = e.target;

    dispatch(
      checked ? filterItem(name) : removeFilterItem(name)
    );
  });

  return (
    <Box
      sx={{
        position: 'relative'
      }}
      width={ 1/4 }
      pt={5}
      px={3}
    >
      <Card
        sx={{
          position: 'fixed',
          borderStyle: 'solid',
          borderWidth: '3px',
          borderLeft: '0',
          borderRight: '0',
          borderColor: 'secondary'
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
          <FilterBox
            name="created"
            handleChange={handleChange}
            top
          >Created</FilterBox>
          <FilterBox
            name="cooked"
            handleChange={handleChange}
            bottom
          >Cooked</FilterBox>
        </Box>
      </Card>
    </Box>
  );
}
