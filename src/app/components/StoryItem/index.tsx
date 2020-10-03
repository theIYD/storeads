import React from 'react';
import { Flex, Heading, Text, Button } from '@chakra-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';

interface Story {
  title: string;
  createdOn: Date;
  id: string;
}

const StoryItem: React.FC<Story> = ({ title, createdOn, id }) => {
  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="lg"
      rounded="md"
      width="100%"
      background="gray.500"
      p={8}
    >
      <Flex flexDirection="column">
        <Heading as="h4" size="md">
          {title}
        </Heading>
        <Text>{moment.utc(createdOn).format('MMMM Do YYYY')}</Text>
        <Link to={'/dashboard/story/' + id}>
          <Button mt={4} size="xs" colorScheme="purple" variant="solid">
            Read
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default StoryItem;
