import { Box, Heading, Image, Tag as ChakraTag, Text, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import Layout from '../../components/organisms/Layout';
// import { Progress } from '@chakra-ui/progress';
import { searchPokemons } from '../../api/pokemon';
import Tag from '../../components/atoms/Tag';
import PropTypes from 'prop-types';

const Index = ({ store, pokemonStore }) => {
  const params = useParams();
  console.log(params);
  const { data, status } = useQuery('getPokemonData', () => searchPokemons(params.name));
  console.log(data);
  // const navigate = useNavigate();
  return (
    <Layout store={store} pokemonStore={pokemonStore}>
      {status === 'success' &&
        [data].map((pokemon) => (
          <Box
            gap={2}
            p={2}
            display={'flex'}
            flexDirection={{ base: 'column', md: 'row' }}
            w="100%"
            key={pokemon.id}
            minH={{ base: 'auto', md: '90vh' }}>
            <Wrap flex={1} justify="center" pt="5">
              <Image
                boxSize={'250px'}
                boxShadow={'md'}
                src={pokemon.sprites.other.dream_world.front_default}
                fallbackSrc={pokemon.sprites.front_default}></Image>
              <Image
                boxSize={'250px'}
                boxShadow={'md'}
                src={pokemon.sprites.other['official-artwork'].front_default}
                fallbackSrc={pokemon.sprites.front_default}></Image>
            </Wrap>
            <Wrap
              flex={1}
              spacing={5}
              flexDirection="column"
              boxShadow={'lg'}
              bg={'blue.50'}
              rounder="md"
              p={10}>
              <Heading display={'block'} size={'lg'}>
                Name : {pokemon.name}
              </Heading>
              <Box display={'flex'} w={'100%'}>
                <Box flex={1}>
                  <Text fontSize={'xl'}>ID : {pokemon.id}</Text>
                </Box>
                <Box flex={1} mb={5} alignItems="center">
                  <Text mb={2} fontSize={'xl'}>
                    Type:
                  </Text>
                  {pokemon.types.map((type) => (
                    <Tag key={type.slot} tagOptions={type.type.name}></Tag>
                  ))}
                </Box>
              </Box>
              <Box mb={15} display={'flex'} w={'100%'}>
                <Box flex={1}>
                  <Text fontSize={'xl'}>Weight : {pokemon.weight}</Text>
                </Box>
                <Box flex={1}>
                  <Text fontSize={'xl'}>Height : {pokemon.height}</Text>
                </Box>
              </Box>
              <Heading mt={5} size={'lg'}>
                Abilities:
              </Heading>
              <Wrap w="100%">
                {pokemon.abilities.map((ability) => (
                  <ChakraTag colorScheme={'facebook'} key={ability.slot}>
                    {ability.ability.name}
                  </ChakraTag>
                ))}
              </Wrap>
              <Heading size={'lg'}>Stats</Heading>
              <Wrap my={5} w={'100%'}>
                {data.stats.map((stat) => (
                  <WrapItem flexDirection={'column'} key={stat.stat.name}>
                    <label>
                      {stat.stat.name} : {stat.base_stat}
                    </label>
                    <progress
                      max={100 > stat.base_stat ? 100 : stat.base_stat}
                      value={stat.base_stat}
                      style={{
                        width: '300px',
                        height: '25px'
                      }}></progress>
                  </WrapItem>
                ))}
              </Wrap>
            </Wrap>
          </Box>
        ))}
    </Layout>
  );
};

Index.propTypes = {
  store: PropTypes.any,
  pokemonStore: PropTypes.any
};

export default Index;
