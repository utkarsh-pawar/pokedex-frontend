import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { googleSignin } from '../../api/auth';
import { Box, Center, Text } from '@chakra-ui/react';
import { config } from '../../config/config';

const Index = ({ store }) => {
  const user = store.userInfo.isUser;

  const handleLogin = async (result) => {
    const data = googleSignin(result.tokenId);
    console.log(result);
    store.login(data);
  };
  const handleFailure = (result) => {
    console.log(result);
  };

  if (user) {
    return <Navigate to="/" replace></Navigate>;
  }

  return (
    <>
      <Center h={'100vh'}>
        <Box w={'xs'} h="sm" rounded={'md'} boxShadow={'xl'}>
          <Center flexDirection={'column'} h="100%" gap={10}>
            <Text fontSize={'lg'}>Login or Signup Through Google</Text>
            <GoogleLogin
              clientId={config.client_id}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          </Center>
        </Box>
      </Center>
    </>
  );
};

Index.propTypes = {
  store: PropTypes.any
};

export default observer(Index);
