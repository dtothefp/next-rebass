import { useContext } from 'react';
import { StoreContext } from '@css/redux';
import Item from '../Item/Item';

export default () => {
  const {state} = useContext(StoreContext);

  if (!state) return null;

  console.log('***STATE', state)

  return (
    <div>
      {Object.keys(state.items).map((id) => {
        const {name} = state.items[id];

        return (
          <Item
            name={name}
            key={id}
          />
        );
      })}
    </div>
  );
};
