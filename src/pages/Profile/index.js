import { Center, Heading, Wrap } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Layout from '../../components/organisms/Layout';
import PokemonCard from '../../components/organisms/PokemonCard';
import PropTypes from 'prop-types';

const Index = ({ pokemonStore, store }) => {
  const [pokemons] = useState(Array.from(pokemonStore.favorites));
  console.log(pokemons);
  return (
    <Layout store={store}>
      <Heading>Favorite Pokemons:</Heading>
      <Center minH={'90vh'} w="100%">
        <Wrap mb={10} justify={'center'} spacing={5} align="center" w={'100%'}>
          {pokemons.length > 0 ? (
            pokemons.map((name) => {
              return <PokemonCard pokemonStore={pokemonStore} key={name} name={name} />;
            })
          ) : (
            <Heading size={'lg'}>No Favorite Pokemons added !!</Heading>
          )}
          ;
        </Wrap>
      </Center>
    </Layout>
  );
};
Index.propTypes = {
  store: PropTypes.any,
  pokemonStore: PropTypes.any
};

export default observer(Index);
