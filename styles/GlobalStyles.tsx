import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
    ${reset}
    html,
    body {
        background-color: ${({ theme }) => theme.colors.backgroundColor};
        color:${({ theme }) => theme.colors.textColor};
        font-family: 'Noto Sans KR', sans-serif;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    button {
        background: inherit;
        border: none;
        box-shadow: none;
        border-radius: 0;
        padding: 0;
        cursor: pointer;
    }
    a,a:hover,a:active {
        color: inherit;
        text-decoration: none;
        outline: none;
    }
    * {
        box-sizing: border-box;
    }
    pre {
        font-family: 'Noto Sans KR',sans-serif;
    }
    h1,h2,h3,h4,h5,h6,p{
        margin:0;
    }
    ul,li{
        padding:0;
        margin:0;
        list-style:none;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
