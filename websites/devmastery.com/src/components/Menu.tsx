import Link from "next/link";
import styled from "styled-components";

const Nav = styled.nav`
  justify-self: end;
  display: grid;
  align-content: center;
  justify-content: space-evenly;
  grid-gap: 2em;
  grid-template-columns: repeat(5, auto);
`;

const NavItem = styled.a`
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
`;

export default function Menu({ text }: { text: object }) {
  let t = text ?? {};
  return (
    <Nav>
      <Link href="/articles" passHref>
        <NavItem>{t["articles"]}</NavItem>
      </Link>
      <Link href="/videos" passHref>
        <NavItem>{t["videos"]}</NavItem>
      </Link>
      <Link href="/podcasts" passHref>
        <NavItem>{t["podcasts"]}</NavItem>
      </Link>
      <Link href="/books" passHref>
        <NavItem>{t["books"]}</NavItem>
      </Link>
      <Link href="/courses" passHref>
        <NavItem>{t["courses"]}</NavItem>
      </Link>
    </Nav>
  );
}
