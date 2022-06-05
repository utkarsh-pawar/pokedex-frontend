import axios from 'axios';
import { config } from '../config/config';

export const googleSignin = async (tokenId) => {
  try {
    const response = await axios.post(`${config.base_url}/user/googlesignin`, {
      tokenId: tokenId
    });
    console.log(response);
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('favs', response.data.data.favorite_pokemons);

    return response.data.data;
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
