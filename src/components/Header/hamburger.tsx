import React from 'react';
import theme from '../../styles/theme';
import styled from 'styled-components';
import preventScroll from '../../utils/preventScroll';

const MenuContainer = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
`;

const HamburgerButton = styled.button.attrs({
  type: 'button',
  ariaControls: 'mobile-nav',
})`
  background: none;
  border-radius: 12.5px;
  border: 2px solid ${theme.colors.BLUE_1};
  overflow: hidden;
  cursor: pointer;
`;

type HamburgerProps = {
  isHoveringHamburger: boolean;
  isMenuOpen: boolean;
};

const HamburgerSVG = styled.svg.attrs({
  viewBox: '-10 -10 120 120',
})<HamburgerProps>`
  width: 35px;
  fill: none;
  stroke: ${theme.colors.BLUE_1};
  transition: translate 0.5s, rotate 0.5s;
  translate: ${(props) => (props.isMenuOpen ? '2.5px 0px;' : '0px 2.5px;')};
  rotate: ${(props) => (props.isMenuOpen ? '0.125turn;' : ';')};
`;

const SVGPath = styled.path.attrs({
  d: 'm 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70',
})<HamburgerProps>`
  stroke-width: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: 0.5s;
  stroke-dasharray: ${(props) =>
    props.isMenuOpen ? '60 105 60 300;' : '60 31 60 300;'};
  stroke-dashoffset: ${(props) => (props.isMenuOpen ? '-90;' : ';')};
`;

type HamburgerMenuProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HamburgerMenuButton = ({
  isMenuOpen,
  setIsMenuOpen,
}: HamburgerMenuProps) => {
  const [isHoveringHamburger, setIsHoveringHamburger] = React.useState(false);

  return (
    <MenuContainer id="mobile-nav">
      <HamburgerButton
        onMouseEnter={() => setIsHoveringHamburger(true)}
        onMouseLeave={() => setIsHoveringHamburger(false)}
        onClick={() => {
          setIsMenuOpen((prev: boolean) => {
            preventScroll(!prev);
            return !prev;
          });
        }}
        aria-expanded={isMenuOpen}
      >
        <HamburgerSVG
          isHoveringHamburger={isHoveringHamburger}
          isMenuOpen={isMenuOpen}
        >
          <SVGPath
            isMenuOpen={isMenuOpen}
            isHoveringHamburger={isHoveringHamburger}
          ></SVGPath>
        </HamburgerSVG>
      </HamburgerButton>
    </MenuContainer>
  );
};

export default HamburgerMenuButton;
