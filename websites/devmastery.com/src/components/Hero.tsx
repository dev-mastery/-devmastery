import styled from "@emotion/styled";
import Image from "next/image";

const HeroLayout = styled.div`
  display: grid;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.black};
  height: 100vh;
  max-height: 540px;
  justify-content: center;
  align-content: center;
  position: relative;
  color: white;
  margin-bottom: 0;
`;

const HeroContent = styled.header`
  position: relative;
  color: ${(props) => props.theme.colors.white};
  height: 100vh;
  max-height: 540px;
  width: 100vw;
  max-width: ${(props: { maxWidth: string }) => props.maxWidth};
  user-select: none;
`;

const HeroOverlay = styled.h1`
  top: 0px;
  height: 100%;
  position: absolute;
  display: grid;
  align-content: center;
  z-index: 10;
  margin: 0;
  padding-bottom: 64px;
  font-size: 2.8rem;
  line-height: 3rem;
  font-weight: semibold;
  text-align: left;
  max-width: 700px;
  text-shadow: 0px 0px 1px ${(props) => props.theme.colors.light};
  color: ${(props) => props.theme.colors.white};
`;

export default function Hero({
  children,
  imageSrc,
  imageCaption,
  maxWidth = "100vw",
}) {
  return (
    <HeroLayout>
      <HeroContent maxWidth={maxWidth}>
        <Image
          alt={imageCaption}
          src={`/images/${imageSrc}`}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <HeroOverlay>
          <div>{children}</div>
        </HeroOverlay>
      </HeroContent>
    </HeroLayout>
  );
}
