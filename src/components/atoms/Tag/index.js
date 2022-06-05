import { Tag, TagLabel } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

const tagStyle = {
  normal: '',
  fighting: 'red',
  flying: 'teal',
  poison: 'purple',
  ground: 'green',
  rock: '',
  bug: 'yellow',
  ghost: 'teal',
  steel: 'whiteAlpha',
  fire: 'orange',
  water: 'twitter',
  grass: 'whatsapp',
  electric: 'telegram',
  psychic: 'teal',
  ice: 'facebook',
  dragon: 'cyan',
  dark: 'blackAlpha',
  fairy: 'pink',
  unknown: '',
  shadow: 'blackAlpha'
};

const Index = ({ tagOptions }) => {
  return (
    <Tag size={'md'} mx={1} colorScheme={tagStyle[tagOptions]}>
      <TagLabel>{tagOptions}</TagLabel>
    </Tag>
  );
};

Index.propTypes = {
  tagOptions: PropTypes.any
};

export default Index;
