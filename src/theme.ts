import { extendTheme } from '@chakra-ui/react';

import { getSearchParam } from '@/utils/getSearchParam';

const colorMode = getSearchParam('colorMode');

const availableColorTins = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];

const tokenToColorMap = {
  primary: 'blue',
  neutral: 'gray',
  accent: 'teal',
  success: 'green',
  warning: 'orange',
  error: 'red',
};

const colors = Object.entries(tokenToColorMap).reduce((acc, [token, color]) => {
  availableColorTins.forEach((tint) => {
    acc[`${token}.${tint}`] = {
      default: `${color}.${tint}`,
      _dark: `${color}.${tint}`,
    };
  });
  return acc;
}, {} as Record<string, { default: string; _dark: string }>);

const theme = extendTheme({
  config: {
    initialColorMode: colorMode || 'dark',
    useSystemColorMode: false,
  },
  semanticTokens: {
    colors: {
      ...colors,
      text: {
        default: 'gray.900',
        _dark: 'gray.50',
      },
    },
  },
});

export default theme;
