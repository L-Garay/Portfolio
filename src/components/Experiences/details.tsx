import * as React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { SharedPageProps } from '../../constants/sharedTypes';
import { Paragraph } from '../../components/shared';
import { ExperiencesProps } from '../../sections/experience';

const EXPERIENCES_DETAILS = [
  {
    title: `Principal Developer @ Noble Intent, LLC`,
    dates: 'August - September 2020',
    listItems: [
      `Principal designer and developer for mental health startup's company website`,
      `Created using the Wix platform for quick development and ease of use for client`,
      `Effectively and efficiently communicated with client to understand their needs and vision and then translated that into a functional and aesthetically pleasing website`,
      `Utilized platform's built in tooling to connect personal domain to site, configure and increase SEO, link personal calendars and emails and implemnt blog functionality`,
      `Managed and maintained site for less than 3 months before handing over responsiblity to internal company employee`,
    ],
    buttonId: 'noble-intent-button',
    siteLink: 'https://www.nobleintentprograms.com/',
  },
  {
    title: 'Software Developer @ Downwrite, Inc',
    dates: 'April 2021 - March 2022',
    listItems: [
      `A small music startup where I helped oversee the launch of their new MVP website`,
      `After launch I was the core contributer with ~50,000 lines of code touched, responsible for maintaining stability for the thousands of users while iterating and adding new features`,
      `Worked closely with designers and key stakeholders to create responsive and elegant UI/UX`,
      `Gained experience with cloud services from integrating with Firebase, utilizing their cloud storage, functions, analytics and authentication services`,
      `Quickly and effeciently familiarized myself with a variety of new processes including, video and audio compression and conversion using FFmpeg and order processing and payment handling utilizing Paypal/Braintree`,
      `Built new and extended existing administration panels and dashboards along with the functionality to generate and download PDF's of the data for use in reporting`,
    ],
    buttonId: 'downwrite-button',
    siteLink: 'https://downwrite.com/',
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
    siteLink: 'https://my.hingehealth.com/onboarding/tamus/registration',
  },
  {
    title: 'Developer @ Your company name',
    dates: 'As soon as you need - Forever',
    listItems: [
      `Here is where I can put down all of the amazing and wonderful things I did for your company`,
      `Whether that be Frontend, Backend or both, I can do it all`,
      `Plus I'm told I'm a pretty cool guy to work with and I send some great memez`,
      `So what are you waiting for?`,
      `P.S. the link is to a non-profit that I support and believe is a good cause, check them out!`,
    ],
    buttonId: 'put-your-name-here-button',
    siteLink: 'https://www.catf.us/',
  },
];

type DetailsProps = SharedPageProps & {
  currentButtonId: string;
};

const DetailsContainer = styled.div<SharedPageProps>`
  ${(props) => {
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

const TitleLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: ${theme.colors.BLUE_1};
  text-decoration: none;
  border-radius: 0;
  background-image: linear-gradient(
      transparent calc(100% - 2px),
      rgb(252, 114, 80) 2px
    ),
    linear-gradient(transparent calc(100% - 2px), transparent 2px);
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

const Details = ({ isAboveSmall, currentButtonId }: DetailsProps) => {
  const [selectedExperience, setSelectedExperience] = React.useState<
    Record<string, any>
  >(EXPERIENCES_DETAILS[0]);

  React.useEffect(() => {
    const selectedExperience = EXPERIENCES_DETAILS.find(
      (experience) => experience.buttonId === currentButtonId
    );
    setSelectedExperience((prev) =>
      selectedExperience ? selectedExperience : prev
    );
  }, [currentButtonId]);

  const role = selectedExperience.title.split('@')[0];
  const companyName = selectedExperience.title.split('@')[1];
  const styledName = (
    <TitleLink href={selectedExperience.siteLink}>{companyName}</TitleLink>
  );

  return (
    <DetailsContainer isAboveSmall={isAboveSmall}>
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
    </DetailsContainer>
  );
};

export default Details;
