import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import axios from '../../../axios';
import { default as to } from 'await-to-js';
import moment from 'moment';
import { FcReadingEbook } from 'react-icons/fc';
import { CgRead } from 'react-icons/cg';

import { useHistory } from 'react-router-dom';

import {
  Flex,
  Text,
  IconButton,
  Tag,
  TagLabel,
  Divider,
  Spinner,
} from '@chakra-ui/core';
import { ArrowBackIcon } from '@chakra-ui/icons';

const ENDPOINT: any = process.env.REACT_APP_API;
const socket = socketIOClient(ENDPOINT);

const Story: React.FC = () => {
  const [story, setStory] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [viewers, setViewers] = useState<number>(0);
  const [reads, setReads] = useState<number>(0);
  const { storyId }: { storyId: string } = useParams();
  const history = useHistory();

  socket.on('currentCount', (count: number) => {
    setViewers(count);
  });

  useEffect(() => {
    const fetchStory = async () => {
      const [err, response]: [any, any] = await to(
        axios.get(`/api/story/${storyId}`)
      );
      if (err) console.error(err);

      const story = response.data.response;
      if (story) {
        setStory(story);
        setLoading(false);
        socket.emit('joinRoom', storyId);
      }
    };

    const updateReads = async () => {
      const [err, response]: [any, any] = await to(
        axios.put(`/api/story/read/${storyId}`)
      );

      if (err) console.error(err);
      setReads(response.data.response.reads);
    };

    fetchStory();
    updateReads();

    return () => {
      socket.emit('leaveRoom', story._id);
    };
    // eslint-disable-next-line
  }, []);

  const goBack = () => {
    socket.emit('leaveRoom', story._id);
    // window.location.pathname = '/dashboard';
    history.goBack();
  };

  return (
    <>
      {loading ? (
        <Flex mt={4} alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Flex my={6} justifyContent="center">
            <Flex
              mx={[4, 4, 'inherit']}
              flexDirection="column"
              width={['100%', '100%', '50%']}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Flex flexDirection="column">
                  <Flex>
                    <IconButton
                      aria-label="Go back"
                      icon={<ArrowBackIcon />}
                      onClick={goBack}
                    />
                  </Flex>
                  <Flex flexDirection="column" my={4}>
                    <Text fontWeight="bold" fontSize={['xl', 'xl', '4xl']}>
                      {story.title}
                    </Text>
                    <Text
                      textTransform="uppercase"
                      fontSize="sm"
                      color="gray.500"
                    >
                      By: {story.userId.name}
                    </Text>
                    <Text
                      textTransform="uppercase"
                      fontWeight="bold"
                      fontSize="xs"
                    >
                      {moment.utc(story.createdAt).format('MMMM Do YYYY')}
                    </Text>
                  </Flex>
                </Flex>
                <Flex flexDirection="column">
                  <Flex alignItems="center">
                    <FcReadingEbook size="2em" />
                    <Text fontWeight="bold">{viewers}</Text>
                    <Tag ml={2} size="sm" colorScheme="cyan">
                      <TagLabel>LIVE</TagLabel>
                    </Tag>
                  </Flex>
                  <Flex alignItems="center">
                    <CgRead size="2em" />
                    <Text fontWeight="bold">{reads}</Text>
                  </Flex>
                </Flex>
              </Flex>
              <Divider />
              <Flex style={{ whiteSpace: 'pre-line' }}>
                <Text
                  style={{ textAlign: 'justify', textJustify: 'inter-word' }}
                >
                  {story.content}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default Story;
