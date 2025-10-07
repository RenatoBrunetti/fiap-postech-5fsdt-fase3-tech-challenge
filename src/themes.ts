import type { DefaultTheme } from 'styled-components';

const breakpoints = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
};

export const lightTheme: DefaultTheme = {
  colors: {
    body: '#fafcff',
    inverted: '#1b1f2c',
    primary: '#569ff9',
    primaryHover: '#437dc3',
    warning: '#f0ad4e',
    warningHover: '#ec971f',
    alert: '#f45b5b',
    alertHover: '#d64545',
    alternative: '#519be1',
    contrast: '#f6f6f6',
    title: '#29537f',
    subtitle: '#383a3a',
    text: '#7f8084',
    light: '#eef5ff',
    input: {
      background: '#ffffff',
      border: '#e6ecf1',
      text: '#999999',
    },
  },
  breakpoints,
};

export const darkTheme: DefaultTheme = {
  colors: {
    body: '#1b1f2c',
    inverted: '#fafcff',
    primary: '#569ff9',
    primaryHover: '#437dc3',
    warning: '#f0ad4e',
    warningHover: '#ec971f',
    alert: '#f45b5b',
    alertHover: '#d64545',
    alternative: '#5184ba',
    contrast: '#384767',
    title: '#f1f6fe',
    subtitle: '#a4a8b5',
    text: '#9699a6',
    light: '#eef5ff',
    input: {
      background: '#37455f',
      border: '#495366',
      text: '#9ea8bf',
    },
  },
  breakpoints,
};

// Extend styled-components" DefaultTheme interface for TypeScript
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      body: string;
      inverted: string;
      primary: string;
      primaryHover: string;
      warning: string;
      warningHover: string;
      alert: string;
      alertHover: string;
      alternative: string;
      contrast: string;
      title: string;
      subtitle: string;
      text: string;
      light: string;
      input: {
        background: string;
        border: string;
        text: string;
      };
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
