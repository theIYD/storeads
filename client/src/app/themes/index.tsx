import { theme } from '@chakra-ui/core';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    fonts: {
      body: 'system-ui, sans-serif',
      heading: 'Georgia, serif',
    },
  },
};

export default customTheme;
