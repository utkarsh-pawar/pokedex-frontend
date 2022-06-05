import { WrapItem, Image, Box, Heading, Spinner, Center } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { addToFav, searchPokemons } from '../../../api/pokemon';
import Tag from '../../atoms/Tag';
import { StarIcon } from '@chakra-ui/icons';

const index = ({ name, pokemonStore }) => {
  const { data, status } = useQuery([name], () => searchPokemons(name));
  const navigate = useNavigate();
  const pokemonPageHandler = () => {
    navigate(`/pokemon/${data?.name}`);
  };

  const addToFavHandler = () => {
    if (pokemonStore.favorites.includes(name)) {
      pokemonStore.removeFav(name);
      addToFav(data?.name);
    } else {
      pokemonStore.addFav(name);
      addToFav(data?.name);
    }
  };
  return (
    <WrapItem
      flexDirection={'column'}
      _hover={{ boxShadow: '2xl' }}
      w="xs"
      boxShadow={'md'}
      overflow={'hidden'}
      p={2}
      rounded={'md'}
      h="sm">
      {status === 'loading' && (
        <Center w="100%" h="100%">
          <Spinner size="lg" />
        </Center>
      )}
      {status === 'success' && (
        <>
          <Box
            onClick={pokemonPageHandler}
            w="100%"
            p={2}
            _hover={{ cursor: 'pointer' }}
            objectFit={'fill'}
            align={'center'}
            bg={'ButtonShadow'}>
            <Image
              boxSize="3xs"
              objectFit="contain"
              fallbackSrc={data?.sprites['front_default']}
              src={data?.sprites.other['official-artwork']['front_default']}></Image>
          </Box>
          <Box
            px={2}
            w={'100%'}
            display="flex"
            alignItems={'center'}
            justifyContent="space-between"
            my={2}>
            <Heading size={'lg'}>{data?.name}</Heading>
            <StarIcon
              boxSize={5}
              cursor={'pointer'}
              color={pokemonStore.favorites.includes(name) ? 'yellow' : 'black'}
              mr={5}
              onClick={addToFavHandler}></StarIcon>
          </Box>
          <Box>
            {data.types.map((type) => (
              <Tag key={type.type.name} tagOptions={type.type.name} />
            ))}
          </Box>
        </>
      )}
    </WrapItem>
  );
};

export default observer(index);
