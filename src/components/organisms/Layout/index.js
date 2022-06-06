import { Container } from '@chakra-ui/react';
import React from 'react';
import Header from '../Header';

const index = ({ children, store, pokemonStore }) => {
  return (
    <Container maxW={'100vw'}>
      <Header pokemonStore={pokemonStore} store={store} />
      {children}
    </Container>
  );
};

export default index;
