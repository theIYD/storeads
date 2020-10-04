import React from 'react';
import { Flex, Button, Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <Flex
      height={['8vh', '8vh', '6vh']}
      alignItems="center"
      bg="#000"
      justifyContent="space-between"
      color="white"
      px={6}
    >
      <Link to="/dashboard">
        <Text fontWeight="bold">Storeads</Text>
      </Link>
      <Flex alignItems="center">
        <Link to="/dashboard/create">
          <Button colorScheme="purple" variant="solid" size="sm" mr={4}>
            <Text fontSize={['xs', 'xs', 'md']}>Create Story</Text>
          </Button>
        </Link>
        <Button
          size="sm"
          variant="outline"
          _hover={{ background: 'transparent' }}
          onClick={() => {
            sessionStorage.clear();
            window.location.pathname = '/';
          }}
        >
          <Text fontSize={['xs', 'xs', 'md']}>Logout</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Nav;
