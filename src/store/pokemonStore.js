import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

class PokemonStore {
  favorites = [];

  constructor() {
    makeObservable(this, {
      favorites: observable,
      addFav: action,
      removeFav: action,
      clearFavs: action
    });
    autorun(this.logFavs);
    runInAction(this.prefetchDetails);
  }

  logFavs = (result) => {
    console.log(result);
  };

  prefetchDetails = () => {
    if (localStorage.getItem('favs') === undefined) {
      return;
    } else {
      return (this.favorites = localStorage.getItem('favs').split(','));
    }
  };

  clearFavs = () => {
    return (this.favorites = []);
  };

  addFav = (name) => {
    return this.favorites.push(name);
  };

  removeFav = (name) => {
    this.favorites.splice(this.favorites.indexOf(name), 1);
    return this.favorites;
  };
}

export default PokemonStore;
