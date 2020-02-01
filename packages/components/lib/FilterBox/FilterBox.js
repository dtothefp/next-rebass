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

const FilterBox = ({children, handleChange, top, bottom}) => (
    <Label
      sx={{
        borderStyle: 'solid',
        borderWidth: '1px',
        borderLeft: '0',
        borderRight: '0',
        borderBottom: bottom ? false : '0',
        borderColor: 'primary'
      }}
      py={2}
      pl={2}
    >
      <Checkbox
        name="created"
        onChange={handleChange}
        sx={{position: 'relative', top: '-4px'}}/>
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
      py={4}
      px={3}
    >
      <Card
        sx={{
          position: 'fixed',
          borderStyle: 'solid',
          borderWidth: '3px',
          borderLeft: '0',
          borderRight: '0',
          borderColor: 'primary'
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
          <FilterBox top>Created</FilterBox>
          <FilterBox bottom>Cooked</FilterBox>
        </Box>
      </Card>
    </Box>
  );
}
