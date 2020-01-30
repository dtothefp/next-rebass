import { useContext } from 'react';
import { StoreContext } from '@css/redux';
import Item from '../Item/Item';

export default () => {
  const {state} = useContext(StoreContext);

  return (
    <div>
      {state.items.map((item) => {
        const {name, id, sent_at_second: sent, event_name} = item;

        if (state.filter.length && !state.filter.includes(event_name)) return null;

        return (
          <Item
            {...item}
            key={id + name + sent}
          />
        );
      })}
    </div>
  );
};
