import * as React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { SharedPageProps } from '../../constants/sharedTypes';
import { Paragraph } from '../../components/shared';
import { ExperiencesProps } from '../../sections/experience';
import { graphql, useStaticQuery } from 'gatsby';

type ContentfulExperiencesData = {
  id: string;
  companyName: string;
  companyLink: string;
  dates: string;
  isContractPosition: boolean;
  contractedThrough?: string;
  contractedThroughLink?: string;
  menuButtonId: string;
  responsibilities: {
    responsibilities: string;
  };
};

type DetailsProps = SharedPageProps & {
  currentButtonId: string;
};

const DetailsContainer = styled.div<SharedPageProps>`
  ${props => {
    return `
      max-width: ${props.isAboveSmall ? '75%' : '100%'};
      margin-left: ${props.isAboveSmall ? '10px' : '0'};
      margin-top: ${props.isAboveSmall ? '0' : '10px'};
    `;
  }}
`;

const DetailsHeaderContainer = styled.div<ExperiencesProps>`
  padding: 10px;
`;

const DetailsTitle = styled(Paragraph)<ExperiencesProps>`
  letter-spacing: -1px;
  font-size: clamp(1.0625rem, 2vw, 1.25rem);
`;

const DetailsSubTitle = styled(Paragraph)<ExperiencesProps>`
  font-size: clamp(0.75rem, 0.7vw, 1rem);
`;
const DetailsDates = styled(Paragraph)<ExperiencesProps>`
  font-size: clamp(0.9rem, 1vw, 1rem);
  color: ${theme.colors.ORANGE_2};
  padding-top: 5px;
`;
const DetailsDecriptionContainer = styled.div<ExperiencesProps>`
  padding: 10px;
`;
const DetailsDescriptionList = styled.ul<ExperiencesProps>`
  font-size: clamp(0.9rem, 1vw, 1rem);
`;
const DescriptionListItem = styled.li<ExperiencesProps>`
  margin-bottom: 10px;
`;

type TitleLinkProps = {
  bgSize: string;
};

const TitleLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})<TitleLinkProps>`
  color: ${theme.colors.BLUE_1};
  text-decoration: none;
  border-radius: 0;
  background-image: linear-gradient(
      transparent calc(100% - 2px),
      rgb(252, 114, 80) 2px
    ),
    linear-gradient(transparent calc(100% - 2px), transparent 2px);
  background-size: ${({ bgSize }) => `0 ${bgSize}, 100% ${bgSize}`};
  background-repeat: no-repeat;
  background-position: 0 bottom, 0 bottom;
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
  padding-bottom: 4px;
  width: calc(100%);

  &:hover {
    background-size: ${({ bgSize }) => `100% ${bgSize}, 100% ${bgSize}`};

    cursor: pointer;
  }
`;

const Details = ({ isAboveSmall, currentButtonId }: DetailsProps) => {
  const contentfulDataQuery = graphql`
    query {
      allContentfulExperiences {
        edges {
          node {
            id
            companyName
            companyLink
            dates
            isContractPosition
            contractedThrough
            contractedThroughLink
            menuButtonId
            responsibilities {
              responsibilities
            }
          }
        }
      }
    }
  `;

  const {
    allContentfulExperiences: { edges: contentfulExperiences }
  } = useStaticQuery(contentfulDataQuery);

  const [selectedExperience, setSelectedExperience] =
    React.useState<ContentfulExperiencesData>(
      contentfulExperiences[contentfulExperiences.length - 1].node
    );

  React.useEffect(() => {
    const selectedExperience = contentfulExperiences.find(
      (gatsbyNode: { node: ContentfulExperiencesData }) =>
        gatsbyNode.node.menuButtonId === currentButtonId
    );
    setSelectedExperience(prev =>
      selectedExperience.node ? selectedExperience.node : prev
    );
  }, [currentButtonId]);

  const responsibilities =
    selectedExperience.responsibilities.responsibilities.split('$$');

  const role = selectedExperience.companyName.split('@')[0];
  const companyName = selectedExperience.companyName.split('@')[1];
  const styledName = (
    <TitleLink href={selectedExperience.companyLink} bgSize="6px">
      {companyName}
    </TitleLink>
  );

  const contract = selectedExperience.isContractPosition ? '(Contract via' : '';
  const contractThrough = selectedExperience.isContractPosition
    ? `${selectedExperience.contractedThrough})`
    : '';
  const styledContractThrough = (
    <TitleLink href="https://foundryinteractive.com" bgSize="3px">
      {contractThrough}
    </TitleLink>
  );

  return (
    <DetailsContainer isAboveSmall={isAboveSmall}>
      <DetailsHeaderContainer isAboveSmall={isAboveSmall}>
        <DetailsTitle isAboveSmall={isAboveSmall}>
          {role} @ {styledName}
        </DetailsTitle>
        {selectedExperience.isContractPosition ? (
          <DetailsSubTitle isAboveSmall={isAboveSmall}>
            {contract} {styledContractThrough}
          </DetailsSubTitle>
        ) : null}

        <DetailsDates isAboveSmall={isAboveSmall}>
          {selectedExperience.dates}
        </DetailsDates>
      </DetailsHeaderContainer>
      <DetailsDecriptionContainer isAboveSmall={isAboveSmall}>
        <DetailsDescriptionList isAboveSmall={isAboveSmall}>
          {responsibilities.map((item: string) => (
            <DescriptionListItem isAboveSmall={isAboveSmall} key={item}>
              {item}
            </DescriptionListItem>
          ))}
        </DetailsDescriptionList>
      </DetailsDecriptionContainer>
    </DetailsContainer>
  );
};

export default Details;
