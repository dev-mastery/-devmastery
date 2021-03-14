import Link from "next/link";
import styled from "@emotion/styled";
import ThemeMode from "./ThemeMode";

const Nav = styled.nav`
  justify-self: end;
  display: grid;
  align-content: center;
  justify-content: space-evenly;
  grid-gap: 2em;
  grid-template-columns: repeat(6, auto);
`;

const NavItem = styled.a`
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
`;

export default function Menu({
  items,
  t,
}: {
  items: MenuItem[];
  t: { [key: string]: string };
}) {
  return (
    <Nav>
      {items.map((item: MenuItem) => (
        <Link key={item.slug} href={`/${item.slug}`}>
          <NavItem>{item.label}</NavItem>
        </Link>
      ))}
      <NavItem>
        <ThemeMode text={t} />
      </NavItem>
    </Nav>
  );
}

export interface MenuItem {
  slug: string;
  priority: number;
  label: string;
}
