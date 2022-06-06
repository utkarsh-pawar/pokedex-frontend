import axios from 'axios';
import { config } from '../config/config';

//fetching data of all pokemons
export const getPokemons = async (limit = 20) => {
  try {
    const randomOffset = Math.floor(Math.random() * 1000);
    const pokemons = await axios.get(
      `${config.api_url}/pokemon/?offset=${randomOffset}&limit=${limit}`
    );
    return pokemons.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request.data);
    } else {
      console.log(e.message);
    }
  }
};
//searching pokemon
export const searchPokemons = async (name) => {
  try {
    const pokemons = await axios.get(`${config.api_url}/pokemon/${name}`);
    return pokemons.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request.data);
    } else {
      console.log(e.message);
    }
  }
};

//add to favourites
export const addToFav = async (name) => {
  try {
    const response = await axios.post(`${config.base_url}/pokemon/${name}`, '', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
  } catch (e) {
    if (e.response) {
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request.data);
    } else {
      console.log(e.message);
    }
  }
};

export const getFavorites = async () => {
  try {
    const response = await axios.get(`${config.base_url}/pokemon/favs`, '', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (e) {
    if (e.response) {
      console.log(e.response.data);
    } else if (e.request) {
      console.log(e.request.data);
    } else {
      console.log(e.message);
    }
  }
};
