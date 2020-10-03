import React, { Suspense } from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/core';
import theme from './themes';

import RoutesContainer from './routes';

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <CSSReset />
    <Suspense fallback={<span>Loading....</span>}>
      <RoutesContainer />
    </Suspense>
  </ChakraProvider>
);
