import { Box, Button, Center, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import PropTypes from 'prop-types';
import Icon from '../../../assets/pokemon-icon-png-0.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { config } from '../../../config/config';

const Index = ({ store }) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/login' || location.pathname === '/signup') return '';
  console.log(store);
  const logoutHandler = () => {
    store.logout();
    console.log('success');
  };
  return (
    <Box
      w="100%"
      border="1px"
      borderColor={'gray.400'}
      borderRadius="0.25rem"
      px={{ base: 2, md: 4 }}
      mb={5}>
      <Flex
        h={20}
        alignItems={'center'}
        justifyContent="space-between"
        color={'white'}
        fontSize={'lg'}>
        <Flex>
          <Flex gap={{ base: 1, md: 5 }}>
            <NavLink to="/">
              <Image boxSize={'50px'} objectFit="cover" src={Icon}></Image>
            </NavLink>
          </Flex>
        </Flex>
        <Center gap={5}>
          <AccountCircleIcon
            style={{
              color: 'black',
              fontSize: '2rem',
              cursor: 'pointer',
              boxSizing: '2rem',
              margin: '0.5rem'
            }}
            onClick={() => navigate('/profile')}
          />
          <GoogleLogout
            clientId={config.client_id}
            buttonText="logout"
            render={(renderProps) => (
              <Button colorScheme={'facebook'} onClick={renderProps.onClick}>
                Logout
              </Button>
            )}
            onLogoutSuccess={logoutHandler}
          />
        </Center>
      </Flex>
    </Box>
  );
};

Index.propTypes = {
  store: PropTypes.any
};

export default Index;
