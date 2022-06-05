import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import Signin from './pages/Signin';
import Landing from './pages/Landing';
import UserStore from './store/UserStore';
import ProtectedRoute from './constants/ProtectedRoute';
import { Center, Spinner } from '@chakra-ui/react';
import PokemonPage from './pages/PokemonPage';
import Profile from './pages/Profile';
import PokemonStore from './store/pokemonStore';
import { config } from './config/config';

function App() {
  const [loading, setLoading] = useState(true);
  const userStore = new UserStore();
  const pokemonStore = new PokemonStore();

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: config.client_id,
        scope: ''
      });
    }
    gapi.load('client:auth2', start);
    setLoading(false);
  }, []);
  return (
    <>
      {loading && (
        <Center w="100%" h="100%">
          <Spinner size="lg" />
        </Center>
      )}
      <Routes>
        <Route element={<ProtectedRoute store={userStore} />}>
          <Route
            path="/"
            element={<Landing pokemonStore={pokemonStore} store={userStore} />}></Route>
          <Route path="/pokemon/:name" element={<PokemonPage />} />
          <Route
            path="/profile"
            element={<Profile store={userStore} pokemonStore={pokemonStore} />}
          />
        </Route>
        <Route path="/signin" element={<Signin store={userStore} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
