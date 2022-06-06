import { Center, Heading, Wrap } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Layout from '../../components/organisms/Layout';
import PokemonCard from '../../components/organisms/PokemonCard';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { getFavorites } from '../../api/pokemon';

const Index = ({ pokemonStore, store }) => {
  const [data] = useQuery('getFavs', getFavorites);
  console.log(data);

  return (
    <Layout store={store} pokemonStore={pokemonStore}>
      <Heading>Favorite Pokemons:</Heading>
      <Center minH={'90vh'} w="100%">
        <Wrap mb={10} justify={'center'} spacing={5} align="center" w={'100%'}>
          {data?.length > 0 ? (
            data?.map((name) => {
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
