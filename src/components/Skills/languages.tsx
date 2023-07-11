import * as React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { Link, Paragraph } from '../../components/shared';
import { SkillsProps } from '../../sections/skills';
import LanguageList from '../../utils/configs/languageConfig';

const LanguageContainer = styled.div<SkillsProps>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: ${({ isAboveLarge }) => (isAboveLarge ? '80%' : '100%')};
  margin: 60px auto 50px auto;
  ${({ inView }) => {
    if (inView) {
      return `
        opacity: 1;
        transform: translateY(0);
      `;
    } else {
      return `
        opacity: 0;
        transform: translateY(50px);
      `;
    }
  }}
  transition: opacity 0.75s linear 0.25s, transform 0.75s linear 0.25s, width .2s linear;
`;

const ItemContainer = styled.div<SkillsProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;

  height: ${props => {
    if (props.isAboveLarge) return '100px';
    if (props.isAboveMedium) return '80px';
    if (props.isAboveSmall) return '70px';
    return '50px';
  }};
  width: ${props => {
    if (props.isAboveLarge) return '100px';
    if (props.isAboveMedium) return '80px';
    if (props.isAboveSmall) return '70px';
    return '50px';
  }};
  margin: ${({ isAboveLarge }) => (isAboveLarge ? '10px 20px' : '10px 10px')};
`;

type ItemLinkProps = {
  url: string;
  currentHoverId: string;
};

const ItemLink = styled(Link).attrs<ItemLinkProps>(props => ({
  href: props.url,
  target: '_blank'
}))<ItemLinkProps>`
  z-index: 100;
  &:hover {
    color: ${theme.colors.ORANGE_1};
    /* if you want to transition the transform on hover-leave, you will need to pass in a prop that indicates when the container is hovered and then apply a transform conditionally (see original implementation for example) */
    ${ItemContainer} {
      transform: translateY(-5px) scale(1.2);
      transition: transform 0.2s linear;
    }
    ${props => {
      const id = `#${props.currentHoverId}`;
      return `
      svg${id},
        svg${id} path,
        svg${id} g,
        svg${id} ellipse {
          fill: ${theme.colors.ORANGE_1};
          transition: fill .15s linear;
        }
      `;
    }}
  }
`;

const Name = styled(Paragraph)`
  font-size: clamp(0.8rem, 1.5vw, 1rem);
`;

const Languages = ({
  isAboveLarge,
  isAboveMedium,
  isAboveSmall,
  inView
}: SkillsProps) => {
  const [currentHoverId, setCurrentHoverId] = React.useState<string>('');

  return (
    <LanguageContainer isAboveLarge={isAboveLarge} inView={inView}>
      {LanguageList.map(language => {
        return (
          <ItemLink
            url={language.link}
            key={language.name}
            currentHoverId={currentHoverId}
            onMouseEnter={() => {
              setCurrentHoverId(`${language.name}SVG`);
            }}
          >
            <ItemContainer
              isAboveLarge={isAboveLarge}
              isAboveMedium={isAboveMedium}
              isAboveSmall={isAboveSmall}
              id={language.name}
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
