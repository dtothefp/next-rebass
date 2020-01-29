import io from 'socket.io-client';
import { useEffect, useState } from 'react';


export default () => {
  const [ state, setState ] = useState({message: 'hi'});

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('now', (data) => {
      setState((prevState) => ({
        ...prevState,
        message: data.message
      }));
    });
  }, []);

  return <h1>Hello {state.message}</h1>;
};
