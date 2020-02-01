import { useContext } from 'react';
import { Box } from 'rebass';
import { Label, Checkbox } from '@rebass/forms';
import { actions, StoreContext } from '@css/redux';
const {
  filterItem,
  removeFilterItem
} = actions;
export default (() => {
  const {
    dispatch
  } = useContext(StoreContext);

  const handleInputChange = e => {
    const {
      checked,
      name
    } = e.target;
    dispatch(checked ? filterItem(name) : removeFilterItem(name));
  };

  return __jsx(Box, {
    width: 1 / 4
  }, __jsx("form", null, __jsx(Label, null, __jsx(Checkbox, {
    name: "created",
    onChange: handleInputChange
  }), "Created"), __jsx(Label, null, __jsx(Checkbox, {
    name: "cooked",
    onChange: handleInputChange
  }), "Cooked")));
});