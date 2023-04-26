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
} from '../svgs/languages/';
import PostgreSQLSVG from '../svgs/languages/postgres';
import theme from '../../styles/theme';

type MarqueeProps = {
  isMobile: boolean;
  marqueeWidth: number;
};

type MarqueeGroupProps = {
  isHoveringIcon: boolean;
};

const MarqueeContainer = styled.div<MarqueeProps>`
  width: ${(props) => `${props.marqueeWidth}px`}; // clamp or max this
  border: solid 2px white; // color is test
  overflow: hidden;
  display: flex;
`;

const MarqueeGroup = styled.div<MarqueeGroupProps>`
  display: flex;
  min-width: 100%;
  animation: scroll-left 10s linear infinite;

  ${(props) =>
    props.isHoveringIcon &&
    `
    animation-play-state: paused;
  `}

  @keyframes scroll-left {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    animation-play-state: paused;
  }
`;

type MarqueeItemContainerProps = {
  // link: string;
  currentHoverId: string;
  isHoveringIcon: boolean;
};

const MarqueeItemContainer = styled.a.attrs({})<MarqueeItemContainerProps>`
  height: 60px;
  width: 60px;
  text-decoration: none;
  margin: 10px 20px;
  border: 1px solid white; // testing
  cursor: pointer;

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
    transform: translateY(-5px) scale(1.3);
  }
  transition: all 0.2s linear;
`;

const MarqueeItemList1 = [
  {
    svg: <HtmlSVG id="htmlSVG" />,
    name: 'htmlSVG',
  },
  {
    svg: <CssSVG id="cssSVG" />,
    name: 'cssSVG',
  },
  {
    svg: <SassSVG id="sassSVG" />,
    name: 'sassSVG',
  },
  {
    svg: <JavaScriptSVG id="jsSVG" />,
    name: 'jsSVG',
  },
  {
    svg: <TypeScriptSVG id="tsSVG" />,
    name: 'tsSVG',
  },
  {
    svg: <ReactSVG id="reactSVG" />,
    name: 'reactSVG',
  },
  {
    svg: <RemixSVG id="remixSVG" />,
    name: 'remixSVG',
  },
  {
    svg: <GraphQLSVG id="gqlSVG" />,
    name: 'gqlSVG',
  },
  {
    svg: <ApolloSVG id="apolloSVG" />,
    name: 'apolloSVG',
  },
  {
    svg: <NodeSVG id="nodeSVG" />,
    name: 'nodeSVG',
  },
  {
    svg: <PrismaSVG id="prismaSVG" />,
    name: 'prismaSVG',
  },
  {
    svg: <PostgreSQLSVG id="psqlSVG" />,
    name: 'psqlSVG',
  },
];

const MarqueeItemList2 = [
  {
    svg: <HtmlSVG id="htmlSVG2" />,
    name: 'htmlSVG2',
  },
  {
    svg: <CssSVG id="cssSVG2" />,
    name: 'cssSVG2',
  },
  {
    svg: <SassSVG id="sassSVG2" />,
    name: 'sassSVG2',
  },
  {
    svg: <JavaScriptSVG id="jsSVG2" />,
    name: 'jsSVG2',
  },
  {
    svg: <TypeScriptSVG id="tsSVG2" />,
    name: 'tsSVG2',
  },
  {
    svg: <ReactSVG id="reactSVG2" />,
    name: 'reactSVG2',
  },
  {
    svg: <RemixSVG id="remixSVG2" />,
    name: 'remixSVG2',
  },
  {
    svg: <GraphQLSVG id="gqlSVG2" />,
    name: 'gqlSVG2',
  },
  {
    svg: <ApolloSVG id="apolloSVG2" />,
    name: 'apolloSVG2',
  },
  {
    svg: <NodeSVG id="nodeSVG2" />,
    name: 'nodeSVG2',
  },
  {
    svg: <PrismaSVG id="prismaSVG2" />,
    name: 'prismaSVG2',
  },
  {
    svg: <PostgreSQLSVG id="psqlSVG2" />,
    name: 'psqlSVG2',
  },
];

const Marquee = ({ isMobile, marqueeWidth }: MarqueeProps) => {
  const [isHoveringIcon, setIsHoveringIcon] = React.useState(false);
  const [currentHoverId, setCurrentHoverId] = React.useState('');

  return (
    <MarqueeContainer isMobile={isMobile} marqueeWidth={marqueeWidth}>
      {/* Group 1 */}
      <MarqueeGroup isHoveringIcon={isHoveringIcon}>
        {MarqueeItemList1.map((item) => {
          return (
            <MarqueeItemContainer
              onMouseEnter={() => {
                setIsHoveringIcon(true);
                setCurrentHoverId(item.name);
              }}
              onMouseLeave={() => setIsHoveringIcon(false)}
              key={item.name}
              currentHoverId={currentHoverId}
              isHoveringIcon={isHoveringIcon}
            >
              {item.svg}
            </MarqueeItemContainer>
          );
        })}
      </MarqueeGroup>
      {/* Group 2 */}
      <MarqueeGroup isHoveringIcon={isHoveringIcon}>
        {MarqueeItemList2.map((item, index) => {
          return (
            <MarqueeItemContainer
              onMouseEnter={() => {
                setIsHoveringIcon(true);
                setCurrentHoverId(item.name);
              }}
              onMouseLeave={() => setIsHoveringIcon(false)}
              key={item.name}
              currentHoverId={currentHoverId}
              isHoveringIcon={isHoveringIcon}
            >
              {item.svg}
            </MarqueeItemContainer>
          );
        })}
      </MarqueeGroup>
    </MarqueeContainer>
  );
};

export default Marquee;
