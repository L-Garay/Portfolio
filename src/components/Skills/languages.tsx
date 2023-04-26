import * as React from 'react';
import styled from 'styled-components';
import {
  CssSVG,
  HtmlSVG,
  SassSVG,
  JavaScriptSVG,
  ReactSVG,
  RemixSVG,
  TypeScriptSVG,
  GraphQLSVG,
  ApolloSVG,
  NodeSVG,
  PrismaSVG,
  PostgresSVG,
} from '../../components/svgs/languages';
import theme from '../../styles/theme';
import { Link, Paragraph } from '../../components/shared';
import { SkillsProps } from '../../sections/skills';

const LanguageList = [
  {
    svg: <HtmlSVG id="HTML5SVG" />,
    name: 'HTML5',
    link: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML',
  },
  {
    svg: <CssSVG id="CSS3SVG" />,
    name: 'CSS3',
    link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  },
  {
    svg: <SassSVG id="SaSSSVG" />,
    name: 'SaSS',
    link: 'https://sass-lang.com/',
  },
  {
    svg: <JavaScriptSVG id="JavaScriptSVG" />,
    name: 'JavaScript',
    link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    svg: <TypeScriptSVG id="TypeScriptSVG" />,
    name: 'TypeScript',
    link: 'https://www.typescriptlang.org/',
  },
  {
    svg: <ReactSVG id="ReactSVG" />,
    name: 'React',
    link: 'https://react.dev/',
  },
  {
    svg: <RemixSVG id="RemixSVG" />,
    name: 'Remix',
    link: 'https://remix.run/',
  },
  {
    svg: <GraphQLSVG id="GraphQLSVG" />,
    name: 'GraphQL',
    link: 'https://graphql.org/',
  },
  {
    svg: <ApolloSVG id="ApolloSVG" />,
    name: 'Apollo',
    link: 'https://www.apollographql.com/',
  },
  {
    svg: <NodeSVG id="NodeSVG" />,
    name: 'Node',
    link: 'https://nodejs.org/en/about',
  },
  {
    svg: <PrismaSVG id="PrismaSVG" />,
    name: 'Prisma',
    link: 'https://www.prisma.io/',
  },
  {
    svg: <PostgresSVG id="PostgreSQLSVG" />,
    name: 'PostgreSQL',
    link: 'https://www.postgresql.org/',
  },
];

const LanguageContainer = styled.div<SkillsProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: ${({ isAboveLarge }) => (isAboveLarge ? '80%' : '100%')};
  margin: 60px auto 50px auto;

  transition: all 0.2s linear;
`;

type ItemProps = SkillsProps & {
  isHoveringIcon: boolean;
  currentHoverId: string;
};

const ItemContainer = styled.div<ItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* background-color: lightblue; */
  z-index: 100;
  height: ${(props) => {
    if (props.isAboveLarge) return '100px';
    if (props.isAboveMedium) return '80px';
    if (props.isAboveSmall) return '70px';
    return '50px';
  }};
  width: ${(props) => {
    if (props.isAboveLarge) return '100px';
    if (props.isAboveMedium) return '80px';
    if (props.isAboveSmall) return '70px';
    return '50px';
  }};
  margin: ${({ isAboveLarge }) => (isAboveLarge ? '10px 20px' : '10px 10px')};

  ${(props) => {
    const id = `#${props.currentHoverId}`;
    if (props.isHoveringIcon) {
      return `
      svg${id},
        svg${id} path,
        svg${id} g {
          fill: ${theme.colors.ORANGE_1};
          transition: fill .15s linear;
        }
      `;
    } else return ``;
  }}

  &:hover {
    transform: translateY(-5px) scale(1.2);
  }

  transition: all 0.2s linear;
`;

type ItemLinkProps = {
  url: string;
};

const ItemLink = styled(Link).attrs<ItemLinkProps>((props) => ({
  href: props.url,
  target: '_blank',
}))<ItemLinkProps>`
  z-index: 100;
  &:hover {
    color: ${theme.colors.ORANGE_1};
  }
`;

const Name = styled(Paragraph)`
  font-size: clamp(0.8rem, 1.5vw, 1rem);
`;

const Languages = ({
  isAboveLarge,
  isAboveMedium,
  isAboveSmall,
}: SkillsProps) => {
  const [isHoveringIcon, setIsHoveringIcon] = React.useState<boolean>(false);
  const [currentHoverId, setCurrentHoverId] = React.useState<string>('');

  return (
    <LanguageContainer isAboveLarge={isAboveLarge}>
      {LanguageList.map((language) => {
        return (
          <ItemLink url={language.link} key={language.name}>
            <ItemContainer
              isAboveLarge={isAboveLarge}
              isAboveMedium={isAboveMedium}
              isAboveSmall={isAboveSmall}
              id={language.name}
              onMouseEnter={() => {
                setIsHoveringIcon(true);
                setCurrentHoverId(`${language.name}SVG`);
              }}
              onMouseLeave={() => {
                setIsHoveringIcon(false);
              }}
              isHoveringIcon={isHoveringIcon}
              currentHoverId={currentHoverId}
            >
              {language.svg}
              <Name>{language.name}</Name>
            </ItemContainer>
          </ItemLink>
        );
      })}
    </LanguageContainer>
  );
};

export default Languages;
