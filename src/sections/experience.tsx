import * as React from 'react';
import styled from 'styled-components';
import {
  Section,
  SectionContent,
  SectionTitle,
  SectionTitleContainer,
} from '../components/sections';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';
import theme from '../styles/theme';
import { SharedPageProps } from '../constants/sharedTypes';

type ExperiencesProps = SharedPageProps & {
  calculatedWidth?: number;
};

const ExperiencesContainer = styled.div<ExperiencesProps>`
  background: lightgrey; //testing
  position: relative;
  margin-bottom: 10px;
  transition: min-width 0.2s linear;
  /* &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 25%;
    height: ${(props) => (props.shouldChangeFlexDirection ? '10%' : '25%')};
    border-left: 1px solid ${theme.colors.ORANGE_1}; // testing
    border-bottom: 1px solid ${theme.colors.ORANGE_1}; // testing
  } */
`;

const ExperiencesTitle = styled(SectionTitle)`
  text-align: end;
`;

const ExperiencesWrapper = styled.div<ExperiencesProps>`
  background: lightblue; // testing
  display: flex;
  flex-direction: ${(props) => (props.isAboveSmall ? 'row' : 'column')};
  margin: 0 auto;
  transition: all 0.2s linear;
`;

type MenuProps = ExperiencesProps & {
  currentButtonId: string;
};

const Menu = styled.div<MenuProps>`
  background: lightgreen; // testing
  display: flex;
  flex-direction: ${(props) => (props.isAboveSmall ? 'column' : 'row')};
  position: relative;

  /* These styles will only ever apply to the current selected MenuButton */
  ${(props) => {
    const id = `#${props.currentButtonId}`;
    return `
      button${id} {
        background: lightblue; // testing
      }
      button${id}:hover {
        background: ${theme.colors.BLUE_7};
      }
    `;
  }}
`;

type MenuLineProps = ExperiencesProps & {
  buttonHeight: number;
  currentButtonIndex: number;
  menuWidth: number;
};

const MenuLine = styled.div<MenuLineProps>`
  position: absolute;
  left: 0;
  ${(props) => {
    const buttonWidth = props.menuWidth / 3;
    if (props.isAboveSmall) {
      return `
      top: 0;
      height: ${props.buttonHeight}px;
      width: 2px;
      transform: translateY(${props.currentButtonIndex * props.buttonHeight}px);
      `;
    } else {
      return `
      bottom: 0;
      height: 2px;
      width: 33%;
      transform: translateX(${props.currentButtonIndex * buttonWidth}px);
      `;
    }
  }}
  z-index: 200;
  background: red; // testing

  transition: transform 0.5s ease-in-out;
`;

type MenuButtonProps = ExperiencesProps & {
  buttonHeight: number;
};

const MenuButton = styled.button<MenuButtonProps>`
  background: lightgoldenrodyellow; // testing
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
  cursor: pointer;
  outline: none;
  border: none;
  ${(props) => {
    if (props.isAboveSmall) {
      return `
      height: ${props.buttonHeight}px;
      border-left: 2px solid grey;
      font-size: 1rem;
      `;
    } else {
      return `
      height: 40px;
      border-bottom: 2px solid grey;
      font-size: 0.8rem;
      `;
    }
  }}

  &:hover {
    background: ${theme.colors.BLUE_7};
    color: white;
  }
`;

const Details = styled.div<SharedPageProps>`
  background: lightpink;
`;

const Experience = () => {
  const [currentButtonIndex, setCurrentButtonIndex] = React.useState<number>(0);
  const [currentButtonId, setCurrentButtonId] = React.useState<string>(
    'Noble-Intent-LLC-button'
  );
  const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
    useDeviceContext();

  const isAboveMobile = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );
  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.SMALL);
  const isAboveMedium = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MEDIUM
  );
  const isAboveLarge = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.LARGE);

  const isMobile = !isAboveSmall;

  const widthDeduction = isAboveLarge
    ? 450
    : isAboveMedium
    ? 300
    : isAboveMobile
    ? 200
    : 100;

  const calcluatedWidth = windowWidth - widthDeduction;

  const flexWidthCutOff = SCREEN_SIZES.SMALL + 75;
  const shouldChangeFlexDirection = windowWidth < flexWidthCutOff;

  const experiencesList = [
    'Noble Intent, LLC',
    'Downwrite, Inc',
    'Hinge Health',
  ];

  const BUTTON_HEIGHT = 60;

  const menuRef = React.useRef<HTMLDivElement>(null);
  const menuWidth = menuRef.current ? menuRef.current.offsetWidth : 0;

  return (
    <Section id="experience" height={isMobile ? windowHeight : undefined}>
      <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
        <ExperiencesContainer
          shouldChangeFlexDirection={shouldChangeFlexDirection}
          calculatedWidth={calcluatedWidth}
        >
          <SectionTitleContainer>
            <ExperiencesTitle>02. My Experiences</ExperiencesTitle>
          </SectionTitleContainer>

          <ExperiencesWrapper isAboveSmall={isAboveSmall}>
            <Menu
              isAboveSmall={isAboveSmall}
              currentButtonId={currentButtonId}
              ref={menuRef}
            >
              {experiencesList.map((experience, index) => {
                const buttonId = experience
                  .split(' ')
                  .join('-')
                  .split(',')
                  .join('');
                return (
                  <MenuButton
                    key={experience}
                    id={`${buttonId}-button`}
                    buttonHeight={BUTTON_HEIGHT}
                    isAboveSmall={isAboveSmall}
                    onClick={() => {
                      setCurrentButtonIndex(index);
                      setCurrentButtonId(`${buttonId}-button`);
                    }}
                  >
                    <span>{experience}</span>
                  </MenuButton>
                );
              })}
              <MenuLine
                buttonHeight={BUTTON_HEIGHT}
                currentButtonIndex={currentButtonIndex}
                isAboveSmall={isAboveSmall}
                menuWidth={menuWidth}
              />
            </Menu>
            <Details isAboveSmall={isAboveSmall}>Details</Details>
          </ExperiencesWrapper>
        </ExperiencesContainer>
      </SectionContent>
    </Section>
  );
};

export default Experience;
