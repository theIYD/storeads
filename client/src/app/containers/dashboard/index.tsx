import React, { useState, useEffect } from 'react';
import { Stack, Flex, Spinner, Text } from '@chakra-ui/core';
import axios from '../../axios';
import { default as to } from 'await-to-js';

import StoryItem from '../../components/StoryItem';

const Dashboard: React.FC = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getStories = async () => {
      const [err, response]: [any, any] = await to(axios.get('/api/story'));
      if (err) console.error(err);

      const stories = response.data.response;
      setLoading(false);
      setStories(stories);
    };

    getStories();
  }, []);

  return (
    <>
      {loading ? (
        <Flex mt={4} alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        <Stack w="50%" margin="2rem auto" spacing={4}>
          {stories.length === 0 ? (
            <Text
              fontSize="sm"
              mt={4}
              textAlign="center"
              color="gray.500"
              fontWeight="bold"
            >
              Be the first one to create a new story!
            </Text>
          ) : (
            stories.map((story: any) => (
              <StoryItem
                id={story._id}
                key={story._id}
                title={story.title}
                createdOn={story.createdAt}
              />
            ))
          )}
        </Stack>
      )}
    </>
  );
};

export default Dashboard;
