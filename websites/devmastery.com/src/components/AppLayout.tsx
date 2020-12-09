import styled, { createGlobalStyle } from "styled-components";
import Image from "next/image";
import Menu from "./Menu";
import { PropsWithChildren } from "react";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 18px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  display: grid;
  width: 100vw;
  min-height: 100vh;
  grid-template-rows: 60px auto minmax(auto, 90px);
`;

const Header = styled.div`
  color: whitesmoke;
  height: 100%;
  width: 100%;
  background-color: #000;
  justify-content: center;
  align-content: center;
  display: grid;
`;

const TopBar = styled.section`
  display: grid;
  grid-template-columns: 200px auto;
  max-width: 1366px;
  width: 96vw;
  align-content: center;
`;

const Logo = styled.div`
  justify-self: start;
`;

const Body = styled.main`
  height: 100%;
  width: 100%;
  color: black;
  background-color: #fefefe;
`;

const Footer = styled.small`
  color: white;
  height: 100%;
  width: 100%;
  background-color: #222;
  text-align: center;
  padding: 1vh 0;
`;

export default function AppLayout({
  children,
  text,
}: PropsWithChildren<{ text?: { menu: object; footer: object } }>) {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <TopBar>
            <Logo>
              <Image src="/images/logo copy.svg" width={200} height={30} />
            </Logo>
            <Menu text={text?.menu} />
          </TopBar>
        </Header>
        <Body>{children}</Body>
        <Footer>{text?.footer["copyright"]}</Footer>
      </Container>
    </>
  );
}
