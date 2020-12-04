import styled, { createGlobalStyle } from "styled-components";
import Image from "next/image";

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
  /* grid-template-rows: 60px auto 180px; */
  grid-template-rows: 60px auto;
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

const Menu = styled.nav`
  justify-self: end;
  display: grid;
  align-content: center;
  justify-content: space-evenly;
  grid-gap: 2em;
  grid-template-columns: repeat(5, auto);
`;

const MenuItem = styled.span`
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
`;

const Body = styled.main`
  height: 100%;
  width: 100%;
  color: black;
  background-color: #fefefe;
`;

const Footer = styled.div`
  color: white;
  height: 100%;
  width: 100%;
  background-color: #222;
`;

export default function AppLayout({ children }) {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <TopBar>
            <Logo>
              <Image src="/images/logo.svg" width={200} height={30} />
            </Logo>
            <Menu>
              <MenuItem>Articles</MenuItem>
              <MenuItem>Videos</MenuItem>
              <MenuItem>Podcasts</MenuItem>
              <MenuItem>Books</MenuItem>
              <MenuItem>Courses</MenuItem>
            </Menu>
          </TopBar>
        </Header>
        <Body>{children}</Body>
        {/* <Footer>Footer</Footer> */}
      </Container>
    </>
  );
}
