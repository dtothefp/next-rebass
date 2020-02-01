import { useContext } from 'react';
import { Box } from 'rebass';
import { Label, Checkbox } from '@rebass/forms';
import {
  actions,
  StoreContext
} from '@css/redux';

const {
  filterItem,
  removeFilterItem
} = actions;

export default () => {
  const {dispatch} = useContext(StoreContext);
  const handleInputChange = ((e) => {
    const {checked, name} = e.target;

    dispatch(
      checked ? filterItem(name) : removeFilterItem(name)
    );
  });

  return (
    <Box width={ 1/4 }>
      <form>
        <Label>
          <Checkbox
            name="created"
            onChange={handleInputChange}
          />
          Created
        </Label>
        <Label>
          <Checkbox
            name="cooked"
            onChange={handleInputChange}
          />
          Cooked
        </Label>
      </form>
    </Box>
  );
}
