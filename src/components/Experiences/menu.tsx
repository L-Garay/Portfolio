import * as React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { ExperiencesProps } from '../../sections/experience';

type MenuContainerProps = ExperiencesProps & {
  currentButtonId: string;
};

const MenuContainer = styled.div<MenuContainerProps>`
  display: flex;
  flex-direction: ${(props) => (props.isAboveSmall ? 'column' : 'row')};
  position: relative;

  /* These styles will only ever apply to the current selected MenuButton */
  ${(props) => {
    const id = `#${props.currentButtonId}`;
    return `
      button${id} {
        background: ${theme.colors.BLUE_5_TRANSPARENT};
        color: ${theme.colors.ORANGE_1};
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
  background: ${theme.colors.ORANGE_1};

  transition: transform 0.5s ease-in-out;
`;

type MenuButtonProps = ExperiencesProps & {
  buttonHeight: number;
};

const MenuButton = styled.button<MenuButtonProps>`
  background: none;
  color: ${theme.colors.BLUE_1};
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
      border-left: 2px solid ${theme.colors.BLUE_7};
      font-size: 1rem;
      `;
    } else {
      return `
      height: 40px;
      border-bottom: 2px solid ${theme.colors.BLUE_7};
      font-size: 0.8rem;
      `;
    }
  }}

  &:hover {
    background: ${theme.colors.BLUE_5};
    color: ${theme.colors.ORANGE_1};
  }
`;

const BUTTON_HEIGHT = 60;
const EXPERIENCES_LIST = [
  {
    name: 'Hinge Health',
    id: 'hinge-health-button',
  },
  {
    name: 'Downwrite, Inc',
    id: 'downwrite-button',
  },
  {
    name: 'Noble Intent, LLC',
    id: 'noble-intent-button',
  },
];

type MenuProps = ExperiencesProps & {
  currentButtonId: string;
  setCurrentButtonId: React.Dispatch<React.SetStateAction<string>>;
};

const Menu = ({
  isAboveSmall,
  currentButtonId,
  setCurrentButtonId,
}: MenuProps) => {
  const [currentButtonIndex, setCurrentButtonIndex] = React.useState<number>(0);

  const menuRef = React.useRef<HTMLDivElement>(null);
  const menuWidth = menuRef.current ? menuRef.current.offsetWidth : 0;

  return (
    <MenuContainer
      isAboveSmall={isAboveSmall}
      currentButtonId={currentButtonId}
      ref={menuRef}
    >
      {EXPERIENCES_LIST.map((experience, index) => {
        return (
          <MenuButton
            key={experience.id}
            id={experience.id}
            buttonHeight={BUTTON_HEIGHT}
            isAboveSmall={isAboveSmall}
            onClick={() => {
              setCurrentButtonIndex(index);
              setCurrentButtonId(experience.id);
            }}
          >
            <span>{experience.name}</span>
          </MenuButton>
        );
      })}
      <MenuLine
        buttonHeight={BUTTON_HEIGHT}
        currentButtonIndex={currentButtonIndex}
        isAboveSmall={isAboveSmall}
        menuWidth={menuWidth}
      />
    </MenuContainer>
  );
};

export default Menu;
