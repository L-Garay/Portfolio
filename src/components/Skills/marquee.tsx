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

const MarqueeTagContainer = styled.a`
  height: 60px;
  width: 60px;
  text-decoration: none;
  margin: 10px 20px;
  border: 1px solid white; // testing
  cursor: pointer;

  &:hover {
    transform: translateY(-5px) scale(1.1);
  }
  transition: all 0.2s linear;
`;

const MarqueeTagImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Marquee = ({ isMobile, marqueeWidth }: MarqueeProps) => {
  const [isHoveringIcon, setIsHoveringIcon] = React.useState(false);
  const fillColor = isHoveringIcon
    ? theme.colors.ORANGE_3
    : theme.colors.BLUE_5;
  return (
    <MarqueeContainer isMobile={isMobile} marqueeWidth={marqueeWidth}>
      <MarqueeGroup isHoveringIcon={isHoveringIcon}>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <HtmlSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <CssSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <SassSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <JavaScriptSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <TypeScriptSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <ReactSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <RemixSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <MarqueeTagImageWrapper>
            <GraphQLSVG fill={fillColor} />
          </MarqueeTagImageWrapper>
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <MarqueeTagImageWrapper>
            <ApolloSVG fill={fillColor} />
          </MarqueeTagImageWrapper>
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <MarqueeTagImageWrapper>
            <NodeSVG fill={fillColor} />
          </MarqueeTagImageWrapper>
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <MarqueeTagImageWrapper>
            <PrismaSVG fill={fillColor} />
          </MarqueeTagImageWrapper>
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <MarqueeTagImageWrapper>
            <PostgreSQLSVG fill={fillColor} />
          </MarqueeTagImageWrapper>
        </MarqueeTagContainer>
      </MarqueeGroup>

      <MarqueeGroup isHoveringIcon={isHoveringIcon}>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <HtmlSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <CssSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <SassSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <JavaScriptSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <TypeScriptSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <ReactSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <RemixSVG fill={fillColor} />
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <MarqueeTagImageWrapper>
            <GraphQLSVG fill={fillColor} />
          </MarqueeTagImageWrapper>
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <MarqueeTagImageWrapper>
            <ApolloSVG fill={fillColor} />
          </MarqueeTagImageWrapper>
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <MarqueeTagImageWrapper>
            <NodeSVG fill={fillColor} />
          </MarqueeTagImageWrapper>
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <MarqueeTagImageWrapper>
            <PrismaSVG fill={fillColor} />
          </MarqueeTagImageWrapper>
        </MarqueeTagContainer>
        <MarqueeTagContainer
          onMouseEnter={() => setIsHoveringIcon(true)}
          onMouseLeave={() => setIsHoveringIcon(false)}
        >
          <MarqueeTagImageWrapper>
            <PostgreSQLSVG fill={fillColor} />
          </MarqueeTagImageWrapper>
        </MarqueeTagContainer>
      </MarqueeGroup>
    </MarqueeContainer>
  );
};

export default Marquee;
