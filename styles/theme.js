export const colors = {
  primaryColor: '#ffc8c8',
  subColor: '#ef9595',
  textColor: '#867070',
  backgroundColor: '#f8f5f8',
  gray: {
    100: '#f1f1f0',
    200: '#d9d9d6',
    300: '#c8c9c7',
    400: '#b1b3b3',
    500: '#97999b',
    600: '#75787b',
    700: '#54565a',
    800: '#212721',
  },
  white: '#ffffff',
  black: '#000000',
};

export const flex = {
  center: `
    display:flex;
    justify-content:center;
    align-items:center;
  `,
  centerColumn: `
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  `,
};

const deviceSizes = {
  fold: '360px', // min-width:359 폴더블접었을때
  mobile: '577px', // min-width:576 모바일
  foldDual: '769px', // min-width:768 태블릿세로, 폴더블폈을때
  tablet: '1201px', // min-width:1200 태블릿가로, 데스크탑작은버전
};

export const devices = {
  fold: `screen and (max-width: ${deviceSizes.fold})`,
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  foldDual: `screen and (max-width: ${deviceSizes.foldDual})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
};

export const theme = {
  colors,
  flex,
  devices,
};

export default theme;
