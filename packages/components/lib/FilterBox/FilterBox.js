import { useContext } from 'react';
import { sizing } from '@material-ui/system';
import styled from 'styled-components';
import {
  actions,
  StoreContext
} from '@css/redux';

const {
  filterItem,
  removeFilterItem
} = actions;

const FilterForm = styled.form`
  ${sizing}
`;

const Label = styled.label`
  display: block;
`;

export default () => {
  const {dispatch} = useContext(StoreContext);
  const handleInputChange = ((e) => {
    const {checked, name} = e.target;

    dispatch(
      checked ? filterItem(name) : removeFilterItem(name)
    );
  });

  return (
    <FilterForm width={1/4}>
      <Label>
        Created
        <input
          name="created"
          type="checkbox"
          onChange={handleInputChange}
        />
      </Label>
      <Label>
        Cooked
        <input
          name="cooked"
          type="checkbox"
          onChange={handleInputChange}
        />
      </Label>
    </FilterForm>
  );
}
