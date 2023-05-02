import React from 'react';
import styled from 'styled-components';
import { Bar } from '../charts';
import { barChartTwoData } from '../../../utils/configs/aboutConfigs';

type BarCardProps = {
  isActive: boolean;
};

const BarCardContainer = styled.div``;

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
  display: flex;
`;

const Column1 = styled.div`
  background: lightgray;
  display: flex;
  align-items: center;
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

const Column2 = styled.div``;

const BarCard = ({ isActive }: BarCardProps) => {
  return (
    <BarCardContainer>
      <TitleContainer>
        <Title>You could say I like 'Soccer'</Title>
      </TitleContainer>
      <ContentContainer>
        <Column1>
          <Description>
            <p>
              Could maybe go into more personal likes/dislikes here, rather than
              qualites/soft skills and hard skills
            </p>
            <p>
              Explain that I love soccer and that the hours are from leaving
              computer on
            </p>
            <p>as always, include short description of uses of bar charts</p>
          </Description>
        </Column1>
        <Column2>
          <Bar barData={barChartTwoData} isActive={isActive} />
        </Column2>
      </ContentContainer>
    </BarCardContainer>
  );
};

export default BarCard;
