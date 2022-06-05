import {
  Box,
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Wrap
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { useQuery } from 'react-query';
import { getPokemons, searchPokemons } from '../../api/pokemon';
import Layout from '../../components/organisms/Layout';
import PokemonCard from '../../components/organisms/PokemonCard';
import PropTypes from 'prop-types';

const Index = ({ store, pokemonStore }) => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');

  const { status, refetch } = useQuery('getPokemons', () => getPokemons(), {
    enabled: false
  });
  const { status: searchStatus, refetch: searchPokemon } = useQuery(
    'searchPokemons',
    () => searchPokemons(search),
    {
      enabled: false
    }
  );
  const pokemonFetchHandler = async () => {
    const data = await refetch();
    setPokemons(data.data.results);
  };
  const searchHandler = async () => {
    if (search.trim() === '') return;
    const data = await searchPokemon();
    if (data.data === undefined) {
      setPokemons([]);
    } else {
      setPokemons([data.data]);
    }
  };

  useEffect(() => {
    pokemonFetchHandler();
  }, []);

  return (
    <Layout store={store}>
      <Box mb={10}>
        <Box my={5}>
          <Center>
            <InputGroup w="sm">
              <Input
                type={'text'}
                placeholder="Search Pokemon"
                value={search}
                borderColor="facebook.800"
                focusBorderColor="facebook.500"
                aria-required
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchHandler();
                  }
                }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <InputRightElement onClick={searchHandler}>
                <SearchIcon />
              </InputRightElement>
            </InputGroup>
          </Center>
        </Box>
        <Center minH={'90vh'} w="100%">
          <Wrap justify={'center'} mb={5} spacing={5} align="center" w={'100%'}>
            {(status === 'loading' || searchStatus === 'loading') && (
              <Center zIndex={20} w="100%" h="100%">
                <Spinner size="lg" />
              </Center>
            )}

            {pokemons.length > 0 ? (
              pokemons.map(({ name }) => {
                return <PokemonCard pokemonStore={pokemonStore} key={name} name={name} />;
              })
            ) : (
              <Heading>404 not found</Heading>
            )}
          </Wrap>
        </Center>
      </Box>
    </Layout>
  );
};
Index.propTypes = {
  store: PropTypes.any,
  pokemonStore: PropTypes.any
};

export default Index;
