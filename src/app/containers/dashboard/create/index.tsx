import React, { useState } from 'react';
import {
  Input,
  Textarea,
  Flex,
  IconButton,
  Button,
  useToast,
} from '@chakra-ui/core';
import { ArrowBackIcon, CheckIcon } from '@chakra-ui/icons';
import axios from '../../../axios';
import { default as to } from 'await-to-js';

import { useHistory } from 'react-router-dom';

const CreateStory: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const toast = useToast();
  const history = useHistory();

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      setContent(content + '\n');
    }
  };

  const createStory = async () => {
    const [err, response]: [any, any] = await to(
      axios.post('/api/story', { title, content })
    );
    if (err) {
      toast({
        title: 'An error occurred! Please try again after some time.',
        status: 'error',
        duration: 1000,
        position: 'bottom',
      });
    }

    if (!response.data.response.error) {
      toast({
        title: 'Yay! ' + response.data.response.message,
        status: 'success',
        duration: 1000,
        position: 'top',
      });
      window.location.pathname = '/dashboard';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <>
      <Flex my={6} justifyContent="center" alignItems="center">
        <Flex
          mx={[4, 4, 'inherit']}
          flexDirection="column"
          width={['100%', '100%', '50%']}
        >
          <Flex justifyContent={['space-between', 'space-between', 'normal']}>
            <IconButton
              aria-label="Go back"
              icon={<ArrowBackIcon />}
              onClick={() => {
                history.goBack();
              }}
            />
            <Button
              ml={4}
              leftIcon={<CheckIcon />}
              colorScheme="purple"
              variant="solid"
              onClick={createStory}
            >
              Publish
            </Button>
          </Flex>
          <Flex height="76vh" my={4} flexDirection="column">
            <Input
              variant="unstyled"
              type="text"
              fontWeight="bold"
              placeholder="An amazing title"
              fontSize={['40px', '40px', '70px']}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              height="auto"
              overflowY="auto"
              variant="unstyled"
              placeholder="It was this time in my life...."
              onChange={handleChange}
              resize="vertical"
              onKeyDown={onKeyDown}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CreateStory;
