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
import Menu from '../components/Experiences/menu';
import { Paragraph } from '../components/shared';

export type ExperiencesProps = SharedPageProps & {
  calculatedWidth?: number;
};

const ExperiencesContainer = styled.div<ExperiencesProps>`
  /* background: lightgrey; //testing */
  position: relative;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 25%;
    height: ${(props) => (props.shouldChangeFlexDirection ? '10%' : '25%')};
    border-left: 1px solid ${theme.colors.ORANGE_1}; // testing
    border-bottom: 1px solid ${theme.colors.ORANGE_1}; // testing
  }
`;

const ExperiencesTitle = styled(SectionTitle)`
  text-align: end;
`;

const ExperiencesWrapper = styled.div<ExperiencesProps>`
  /* background: lightblue; // testing */
  display: flex;
  flex-direction: ${(props) => (props.isAboveSmall ? 'row' : 'column')};
  justify-content: end;
  max-width: 820px;
  transition: all 0.2s linear;
`;

const Details = styled.div<SharedPageProps>`
  /* background: lightpink; */
  max-width: ${(props) => (props.isAboveSmall ? '75%' : '100%')};
`;

const DetailsHeaderContainer = styled.div<ExperiencesProps>`
  /* background: lightgreen; //testing */
  padding: 10px;
`;

const DetailsTitle = styled(Paragraph)<ExperiencesProps>`
  letter-spacing: -1px;
`;
const DetailsDates = styled(Paragraph)<ExperiencesProps>`
  font-size: 1rem;
`;
const DetailsDecriptionContainer = styled.div<ExperiencesProps>`
  /* background: lightsteelblue; //testing */
  padding: 10px;
`;
const DetailsDescriptionList = styled.ul<ExperiencesProps>`
  font-size: 1rem;
`;
const DescriptionListItem = styled.li<ExperiencesProps>``;

const TitleLink = styled.a`
  color: ${theme.colors.BLUE_1};
  text-decoration: none;
  border-radius: 0;
  background-image: linear-gradient(
      transparent calc(100% - 2px),
      rgb(252, 114, 80) 2px
    ),
    linear-gradient(transparent calc(100% - 2px), #cbcbcb 2px);
  background-size: 0% 6px, 100% 6px;
  background-repeat: no-repeat;
  background-position: 0 bottom, 0 bottom;
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
  padding-bottom: 4px;
  width: calc(100%);

  &:hover {
    background-size: 100% 6px, 100% 6px;
    cursor: pointer;
  }
`;

const EXPERIENCES_DETAILS = [
  {
    title: `Principal Developer @ Noble Intent, LLC`,
    dates: 'August - September 2020',
    listItems: [
      `Principal designer and developer for mental health startup's company website`,
      `Created using the Wix platform for quick development and ease of use for client`,
      `Utilized platform's built in tooling to connect personal domain to site, configure and increase SEO, link personal calendars and emails and implemnt blog functionality`,
    ],
    buttonId: 'noble-intent-button',
  },
  {
    title: 'Software Developer @ Downwrite, Inc',
    dates: 'April 2021 - March 2022',
    listItems: [
      `A small music startup where I helped oversee the launch of their new MVP website`,
      `After launch, I was the core contributer with ~50,000 lines of code touched`,
      `Worked closely with designers and stakeholders to create responsive and elogant UI/UX and implement new features as requested`,
      `Gained exposure to a variety of tools and processes like video and music compression, conversion and playing using FFmpeg, order creation and payment processing using Paypal and Braintree, and cloud services using Firebase`,
    ],
    buttonId: 'downwrite-button',
  },
  {
    title: 'Fronted Developer @ Hinge Health',
    dates: 'April - September 2022',
    listItems: [
      `Embedded with an internal team of 6 responsible for the company's onboarding application for their healthcare services`,
      `Touched ~15,000 lines of code touched across 4 different repositories`,
      `Successfully increased application's onboarding conversion rate by a statistically significant amount`,
      `Achieved by migrating pages from a legacy codebase to a modern React codebase following best practices and implementing new features and UI/UX changes to increase user engagement`,
      `Focused on increasing web accessibility to ensure that the application was operable by all users`,
      `Wrote extensive unit, component and end-to-end tests to ensure that the application was stable and reduce drop-offs due to errors`,
      `Implemented A/B testing to measure effectivness and impact of new features and UI/UX changes on user engagement and conversion rate`,
    ],
    buttonId: 'hinge-health-button',
  },
];

const Experience = () => {
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
    ? 650
    : isAboveMedium
    ? 300
    : isAboveMobile
    ? 200
    : 100;

  const calcluatedWidth = windowWidth - widthDeduction;

  const flexWidthCutOff = SCREEN_SIZES.SMALL + 75;
  const shouldChangeFlexDirection = windowWidth < flexWidthCutOff;

  const [selectedExperience, setSelectedExperience] = React.useState<
    Record<string, any>
  >(EXPERIENCES_DETAILS[0]);
  const [currentButtonId, setCurrentButtonId] = React.useState<string>(
    'hinge-health-button'
  );

  React.useEffect(() => {
    const selectedExperience = EXPERIENCES_DETAILS.find(
      (experience) => experience.buttonId === currentButtonId
    );
    setSelectedExperience((prev) =>
      selectedExperience ? selectedExperience : prev
    );
  }, [currentButtonId]);

  const role = selectedExperience.title.split('@')[0];
  console.log(role);
  const companyName = selectedExperience.title.split('@')[1];
  const styledName = <TitleLink>{companyName}</TitleLink>;

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
              setCurrentButtonId={setCurrentButtonId}
              currentButtonId={currentButtonId}
            />
            <Details isAboveSmall={isAboveSmall}>
              <DetailsHeaderContainer isAboveSmall={isAboveSmall}>
                <DetailsTitle isAboveSmall={isAboveSmall}>
                  {role} @ {styledName}
                </DetailsTitle>
                <DetailsDates isAboveSmall={isAboveSmall}>
                  {selectedExperience.dates}
                </DetailsDates>
              </DetailsHeaderContainer>
              <DetailsDecriptionContainer isAboveSmall={isAboveSmall}>
                <DetailsDescriptionList isAboveSmall={isAboveSmall}>
                  {selectedExperience.listItems.map((item: string) => (
                    <DescriptionListItem isAboveSmall={isAboveSmall} key={item}>
                      {item}
                    </DescriptionListItem>
                  ))}
                </DetailsDescriptionList>
              </DetailsDecriptionContainer>
            </Details>
          </ExperiencesWrapper>
        </ExperiencesContainer>
      </SectionContent>
    </Section>
  );
};

export default Experience;
