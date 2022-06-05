import { Container } from '@chakra-ui/react';
import React from 'react';
import Header from '../Header';

const index = ({ children, store }) => {
  return (
    <Container maxW={'100vw'}>
      <Header store={store} />
      {children}
    </Container>
  );
};

export default index;
