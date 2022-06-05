import { action, autorun, makeObservable, observable, runInAction } from 'mobx';

class PokemonStore {
  favorites = [];

  constructor() {
    makeObservable(this, {
      favorites: observable,
      addFav: action,
      removeFav: action
    });
    autorun(this.logFavs);
    runInAction(this.prefetchDetails);
  }

  logFavs = (result) => {
    console.log(result);
  };

  prefetchDetails = () => {
    return (this.favorites = localStorage.getItem('favs')?.split(','));
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
