import { createGlobalStyle, css } from "styled-components";

export const pseudoLinkElem = css`
  position: relative;
  display: inline-block;
  color: ${({ theme }) => theme.styles.colors.textColor};
  font-weight: 500;
  letter-spacing: 0.04em;
  transition: color ${({ theme }) => theme.styles.transition.base};

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.styles.colors.accentGradient};
    border-radius: 2px;
    transition: width ${({ theme }) => theme.styles.transition.base};
  }

  &:hover {
    color: ${({ theme }) => theme.styles.colors.decorColorLight};

    &::after {
      width: 100%;
    }
  }
`;

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    color: ${({ theme }) => theme.styles.colors.textColor};
    background-color: ${({ theme }) => theme.styles.colors.mainBg};
    font-family: ${({ theme }) => theme.styles.font.fontFamilies.join(", ")};
    font-size: 16px;
    line-height: 1.6;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1,
  h2,
  h3,
  li,
  a,
  button {
    font-family: ${({ theme }) =>
      theme.styles.font.headingFamilies.join(", ")};
    margin: 0;
  }

  h1 {
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }

  h2 {
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.25;
  }

  p {
    margin: 0 0 1rem;
    line-height: 1.75;
    color: ${({ theme }) => theme.styles.colors.textMuted};
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color ${({ theme }) => theme.styles.transition.fast};
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.styles.colors.decorColor};
    outline-offset: 3px;
  }

  .swiper-wrapper {
    padding: 0.5rem 0 1.5rem;
  }

  .swiper-slide {
    height: auto;
  }

  ::selection {
    background: rgba(124, 108, 240, 0.35);
    color: ${({ theme }) => theme.styles.colors.textColor};
  }
`;

export default GlobalStyles;
