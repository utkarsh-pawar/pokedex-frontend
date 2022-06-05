import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import { createUserStore } from './UserStore';
import { createPokemonStore } from './pokemonStore';

import { useLocalObservable } from 'mobx-react-lite';

const UserContext = createContext(null);
const PokemonContext = createContext(null);

export const UserProvider = ({ children }) => {
  const userStore = useLocalObservable(createUserStore);

  return <UserContext.Provider value={userStore}>{children}</UserContext.Provider>;
};
export const PokemonProvider = ({ children }) => {
  const pokemonStore = useLocalObservable(createPokemonStore);

  return <PokemonContext.Provider value={pokemonStore}>{children}</PokemonContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
export const useUserStore = () => useContext(UserContext);
export const usePokemonStore = () => useContext(PokemonContext);
