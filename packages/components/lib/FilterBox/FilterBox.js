import { useContext } from 'react';
import {
  actions,
  StoreContext
} from '@css/redux';

const {
  filterItem,
  removeFilterItem
} = actions;

export default () => {
  const {dispatch, state} = useContext(StoreContext);
  const handleInputChange = ((e) => {
    const {checked, name} = e.target;

    dispatch(
      checked ? filterItem(name) : removeFilterItem(name)
    );
  });

  return (
    <form>
      <label>
        Created
        <input
          name="created"
          type="checkbox"
          onChange={handleInputChange}
        />
      </label>
      <label>
        Cooked
        <input
          name="cooked"
          type="checkbox"
          onChange={handleInputChange}
        />
      </label>
    </form>
  );
}
