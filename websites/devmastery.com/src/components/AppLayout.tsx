import styled from "@emotion/styled";
import Image from "next/image";
import Menu from "./Menu";
import { PropsWithChildren } from "react";

const Container = styled.div`
  display: grid;
  width: 100vw;
  min-height: 100vh;
  grid-template-rows: 60px auto minmax(auto, 90px);
`;

const Header = styled.div`
  color: ${({ theme }) =>
    theme.mode === "dark" ? theme.colors.light : theme.colors.white};
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? theme.colors.black : theme.colors.dark};
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
  color: ${({ theme }) =>
    theme.mode === "dark" ? theme.colors.black : theme.colors.white};
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? theme.colors.dark : theme.colors.light};
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
}: PropsWithChildren<{ text?: { header: object; footer: object } }>) {
  return (
    <Container>
      <Header>
        <TopBar>
          <Logo>
            <Image src="/images/logo copy.svg" width={200} height={30} />
          </Logo>
          <Menu text={text?.header} />
        </TopBar>
      </Header>
      <Body>{children}</Body>
      <Footer>{text?.footer["copyright"]}</Footer>
    </Container>
  );
}
