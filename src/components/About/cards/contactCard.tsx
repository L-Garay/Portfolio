import React from 'react';
import { ButtonAsLink } from '../../../components/shared';
import SOCIALS from '../../../constants/socials';
import styled from 'styled-components';

type ContactCardProps = {};

const ContactCardContainer = styled.div``;

const TitleContainer = styled.div`
  border: 1px solid red;
  background: lightblue;
  padding: 10px;
`;

const Title = styled.h3`
  margin: 0;
  padding: 0;
  color: black;
`;

const ContentContainer = styled.div`
  max-width: 784px;
  height: 500px;
  border: 1px solid blue;
  background: lightgreen;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ROW_STYLES = `
  text-align: center;
`;

const Row1 = styled.div`
  ${ROW_STYLES}
  background: lightgray;
  margin: 10px 0;
`;

const Description = styled.div`
  border: 1px solid purple;
  width: 100%;

  p {
    padding: 0;
    font-size: 1.2rem;
  }
`;

const Row2 = styled.div`
  ${ROW_STYLES}
  margin: 10px 0;
`;

type Row3Props = {
  isHovering: boolean;
  hoverTargetId: string;
};

const Button = styled.button`
  background: none;
  border: 1px solid black;
  color: red;
  height: 40px;
  width: 60px;
  cursor: pointer;
  border-radius: 12.5px;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const Row3 = styled.div<Row3Props>`
  ${ROW_STYLES}
  margin: 10px 0;
  padding: 10px 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

type ResumeButtonProps = {
  targetLink: string;
  targetType: string;
};
const ResmueButton = styled(ButtonAsLink).attrs<ResumeButtonProps>((props) => ({
  href: props.targetLink,
  target: props.targetType,
  download: props.targetType === '_self' ? true : undefined,
}))<ResumeButtonProps>`
  text-align: center;
  cursor: pointer;
`;

const ContactCard = ({}: ContactCardProps) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const [hoverTargetId, setHoverTargetId] = React.useState('');
  console.log('isHovering', isHovering);
  return (
    <ContactCardContainer>
      <TitleContainer>
        <Title>Get in touch</Title>
      </TitleContainer>
      <ContentContainer>
        <Row1>
          <Description>
            <p>Thank you for checking out my site!</p>
            <p>
              Obviously I can't tell you everything about myself or my
              experiences through here, so if you'd like to know more or have
              any questions (or just want to say hello), please feel free to
              reach out.
            </p>
            <p>
              You can use any of the methods found below and I'll respond as
              quickly as I can!{' '}
            </p>
          </Description>
        </Row1>
        <Row2>
          <Description>
            <p>
              <span>Phone:</span>
              {SOCIALS.phone}
            </p>
          </Description>
        </Row2>
        <Row3 isHovering={isHovering} hoverTargetId={hoverTargetId}>
          <button
            style={{ color: isHovering ? 'red' : 'blue' }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Test 8383
          </button>
          <Button>test 2</Button>
          <Button>test 3</Button>
        </Row3>
      </ContentContainer>
    </ContactCardContainer>
  );
};

export default ContactCard;
