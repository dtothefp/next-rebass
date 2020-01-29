import io from 'socket.io-client';
import { useEffect, useState } from 'react';


export default () => {
  const [ state, setState ] = useState({items: []});

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('data', ({items}) => {
      setState((prevState) => ({
        ...prevState,
        items
      }));
    });
  }, []);

  return <h1>Hello {state.message}</h1>;
};
