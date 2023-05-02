import React from 'react';
import styled from 'styled-components';
import { Donut } from '../charts';
import { DonutConfig } from '../../../utils/configs/aboutConfigs';

type DonutCardProps = {
  isActive: boolean;
};

const DonutCardContainer = styled.div`
  padding: 20px;
  border: 1px solid red;
  background: lightsalmon;
`;

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
  border: 1px solid blue;
  background: lightgreen;
  padding: 10px;
`;

const SHARED_ROW_STYLES = `
  display: flex;
`;

const Row1 = styled.div`
  background: lightgray;
  justify-content: space-between;
  ${SHARED_ROW_STYLES}
`;

const Description = styled.div`
  border: 1px solid purple;
  max-width: 300px;

  p {
    margin: 0;
    padding: 0;
    font-size: 1rem;
  }
`;

const Row2 = styled.div`
  ${SHARED_ROW_STYLES}
`;

const DonutCard = ({ isActive }: DonutCardProps) => {
  console.log('isActive', isActive);
  return (
    <DonutCardContainer>
      <TitleContainer>
        <Title>Skills I'd like to learn</Title>
      </TitleContainer>
      <ContentContainer className="content-container">
        <Row1 className="row1">
          <Donut {...DonutConfig[0]} isActive={isActive} />
          <Description className="description">
            <p>
              this will be the description for this card, describing the
              different skills and a little bit of why i want to learn them.
            </p>
            <p>Can also explain purpose/uses of donut charts.</p>
          </Description>
          <Donut {...DonutConfig[1]} isActive={isActive} />
        </Row1>
        <Row2 className="row2">
          <Donut {...DonutConfig[2]} isActive={isActive} />
          <Donut {...DonutConfig[3]} isActive={isActive} />
          <Donut {...DonutConfig[4]} isActive={isActive} />
          <Donut {...DonutConfig[5]} isActive={isActive} />
        </Row2>
      </ContentContainer>
    </DonutCardContainer>
  );
};

export default DonutCard;
