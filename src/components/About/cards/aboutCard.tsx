import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

type AboutCardProps = {
  isActive: boolean;
};

const AboutCardContainer = styled.div``;

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

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Row2 = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Description1 = styled.div`
  border: 1px solid purple;
  max-width: 300px;

  p {
    margin: 0;
    padding: 0;
    font-size: 1rem;
  }
`;

const Description2 = styled.div`
  border: 1px solid purple;
  max-width: 300px;

  p {
    margin: 0;
    padding: 0;
    font-size: 1rem;
  }
`;

const Row3 = styled.div``;
const SmallParagraph = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
`;

const AboutCard = ({ isActive }: AboutCardProps) => {
  const profileImg = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "ovalPortrait.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  `);
  console.log(profileImg);
  return (
    <AboutCardContainer>
      <TitleContainer>
        <Title>You know that I know that you want to know about me</Title>
      </TitleContainer>
      <ContentContainer>
        <Row1>
          <ImageWrapper>
            <GatsbyImage
              image={profileImg.file.childImageSharp.gatsbyImageData}
              alt="black and white oval portrait of Logan Garay"
              imgStyle={{ width: 200 }}
              style={{ width: 200 }}
            />
          </ImageWrapper>
        </Row1>
        <Row2>
          <Description1>
            <p>I'm not entirely sure how I want this lower section to look.</p>
            <p>
              But I'm thinking that maybe two different columns below the img
              might look decent
            </p>
          </Description1>
          <Description2>
            <p>
              Could provide a nice natural break to change topics or change
              provide additional context
            </p>
            <p>
              Will likely need to be iterated upon a couple of times to create
              meaningful content
            </p>
          </Description2>
        </Row2>
        <Row3>
          <SmallParagraph>
            Disclaimer that every chart is hand made and dependency free, but
            that in reality I would use a library like (list libraries here)
          </SmallParagraph>
        </Row3>
      </ContentContainer>
    </AboutCardContainer>
  );
};

export default AboutCard;
