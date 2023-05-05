import React from 'react';
import styled from 'styled-components';
import { AnimatedPie } from '../charts';
import Pie from '../charts/pie';
import {
  pieChartOneData,
  pieChartTwoData,
  StaticPie1Data,
  StaticPie2Data,
} from '../../../utils/configs/aboutConfigs';

type PieCardProps = {
  isActive: boolean;
};

const PieCardContainer = styled.div`
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

const Row1 = styled.div`
  background: lightgray;
`;

const Description = styled.div`
  border: 1px solid purple;
  width: 100%;

  p {
    margin: 0;
    padding: 0;
    font-size: 1rem;
  }
`;

const Row2 = styled.div``;
const ChartTitle = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1rem;
`;
const ChartKey = styled.div`
  min-height: 90px;
  min-width: 75px;
  max-width: 85px;
  border: 1px solid black;
  padding: 5px;
  margin: 10px 0;
`;

const SmallParagraph = styled.div`
  margin: 0;
  padding: 0;
  font-size: 0.85rem;
  display: flex;
  align-items: center;

  span {
    min-width: 28px;
  }

  div {
    margin-left: 8px;
  }
`;

const Row3 = styled.div`
  display: flex;
  justify-content: space-around;
`;

const PieCard = ({ isActive }: PieCardProps) => {
  return (
    <PieCardContainer>
      <TitleContainer>
        <Title>Most appreciated qualities</Title>
      </TitleContainer>
      <ContentContainer>
        <Row1>
          <Description>
            <p>
              This will be a description of some of my best qualities and soft
              skills as 'voted' on by others.
            </p>
            <p>
              A chance to brag a bit about myself and talk about culture fit
              etc.
            </p>
            <p>With again a small description of the uses of pie charts</p>
          </Description>
        </Row1>
        <Row2>
          <ChartTitle>Percentage of votes for each quality</ChartTitle>
          <ChartKey>
            <SmallParagraph>
              <span> 1st:</span>{' '}
              <div style={{ height: 8, width: 8, background: 'blue' }} />
            </SmallParagraph>
            <SmallParagraph>
              <span> 2nd:</span>{' '}
              <div style={{ height: 8, width: 8, background: 'black' }} />
            </SmallParagraph>
            <SmallParagraph>
              <span> 3rd:</span>{' '}
              <div style={{ height: 8, width: 8, background: 'red' }} />
            </SmallParagraph>
            <SmallParagraph>
              <span> 4th:</span>{' '}
              <div style={{ height: 8, width: 8, background: 'green' }} />
            </SmallParagraph>
            <SmallParagraph>
              <span> 5th:</span>{' '}
              <div style={{ height: 8, width: 8, background: 'purple' }} />
            </SmallParagraph>
          </ChartKey>
        </Row2>
        <Row3>
          <Pie pieData={StaticPie1Data} />
          <Pie pieData={StaticPie2Data} />
          <AnimatedPie pieData={pieChartOneData} isActive={isActive} />
          <AnimatedPie pieData={pieChartTwoData} isActive={isActive} />
        </Row3>
      </ContentContainer>
    </PieCardContainer>
  );
};

export default PieCard;
